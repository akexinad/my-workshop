import { Attribute, Feature, Graph, Vertex } from '../proto/element_pb'
import { DirectedAcyclicGraph } from 'typescript-graph'  

import { runPy } from './runPython'
import { Series, Dict, Dag, SeriesValue, BlockImpl, Region, RegionBlockRow, CB, TB } from '../types'

type AllSeries = Dict<Series>

export function saveByteArray(downloadName: string, byte: ArrayBuffer) {
    var blob = new Blob([byte], { type: "application/x-protobuf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = downloadName;
    link.download = fileName;
    link.click();
};


export function bufferToBase64(buf: Uint8Array) {
    var binstr = Array.prototype.map.call(buf, function (ch) {
        return String.fromCharCode(ch);
    }).join('');
    return btoa(binstr);
}

export function base64ToBuffer(base64: string) {
    var binstr = atob(base64);
    var buf = new Uint8Array(binstr.length);
    Array.prototype.forEach.call(binstr, function (ch, i) {
      buf[i] = ch.charCodeAt(0);
    });
    return buf;
}

export function blocksToSeries(blocks: BlockImpl[]): AllSeries {
    const toReturn: AllSeries = {};

    blocks.forEach(b => {
        if (b.type === 'CODE') {
            const {format} = b;
            toReturn[b.name] = { ...b, values: b.values.map(b => ({ new: false, value: `${b}`, format: (format || 'none') }))}
        } else if (b.type === 'TEXT') {
            toReturn[b.name] = { ...b, code: 'TEXT', values: [{ value: b.text, format: 'none' }]}
        } else if (b.type === 'CREATE_FEATURE') {
            toReturn[b.name] = { ...b, code: 'CREATE_FEATURE', values: [{ value: JSON.stringify({size: b.size, position: b.position}), format: 'none'}]}
        } else if (b.type === 'REGION') {
            toReturn[b.name] = { ...b, code: 'REGION', values: [{ value: JSON.stringify(b), format: 'none' }] }
        }
    })

    return toReturn
}

export function seriesToBlocks(series: AllSeries): BlockImpl[] {
    let toReturn: BlockImpl[] = []

    let i = 0;

    for (const k in series) {
        if (series.hasOwnProperty(k)) {
            const s = series[k];

            if (s.code === 'TEXT') {
                toReturn = [...toReturn, { ...s, type: 'TEXT', text: s.values[0].value, order: i}]
            } else if (s.code === 'CREATE_FEATURE') {
                toReturn = [...toReturn, { ...s, type: 'CREATE_FEATURE', ...JSON.parse(s.values[0].value), order: i }]
            } else if (s.code === 'REGION') { 
                toReturn = [...toReturn, { ...s, type: 'REGION', ...JSON.parse(s.values[0].value), order: i}]
            } else if (!s.isStatic) {
                toReturn = [...toReturn, {...s, type: 'CODE', format: ((s.values[0] || {}).format || 'none'), values: s.values.map(v => {
                    const f = Number(v.value)

                    if (!isNaN(f)) {
                        return f
                    } else {
                        return v.value
                    }
                }), order: i}]
            }

            i++;
        }
    }

    return toReturn
}

export function blocksToRegions(blocks: BlockImpl[]): (Region | TB)[] {
    let toReturn: (Region | TB)[] = [{type: 'REGION', data: [], name: 'default', description: '', frozenColumns: 0, hasHeader: false, hasFooter: false, order: -1}];
    blocks.forEach((block) => {
        const toReturnRegionsOnly = <Region[]>toReturn.filter(r => r.type === 'REGION');
        switch (block.type) {
            case 'REGION':
                if (toReturnRegionsOnly.length === 1 && toReturnRegionsOnly[0].name === 'default') {
                    toReturn = toReturn.filter(a => a.type === 'TEXT')
                    toReturn.push({...block, data: []})
                } else {
                    // Set up the footer for the previous region only if needed
                    const currentRegion: Region = toReturnRegionsOnly[toReturnRegionsOnly.length - 1];
                    setUpFooter(currentRegion)

                    // Add our new region
                    toReturn.push({...block, data: []})
                }
                break;
            case 'CODE':
                const currentRegion: Region = toReturnRegionsOnly[toReturnRegionsOnly.length - 1];

                // Add the headers if this is the first row of a region and we want headers
                if (currentRegion.data.length === 0 && currentRegion.hasHeader && !currentRegion.header) {
                    // toReturn[toReturn.length - 1] = (currentRegion || []);
                    // type coerce the values of this codeblock to strings
                    currentRegion.header = ['blank', ...block.values.map(a => `${a}`)]
                } else {
                    // toReturn[toReturn.length - 1] = (currentRegion || []);
                    currentRegion.data.push(blockValuesWithCodeBlocks(block, blocks));
                }
                break;
            
            case 'TEXT':
                toReturn.push(block)        
            default:
                break;
        }
    })

    // Do this one last time when we get to the end of the doc
    const lastRegion = <Region>toReturn.filter(r => r.type === 'REGION')[toReturn.filter(r => r.type === 'REGION').length - 1];
    setUpFooter(lastRegion)
    

    return toReturn;
}

function blockValuesWithCodeBlocks(block: CB, blocks: BlockImpl[]): RegionBlockRow {
    return [block.description || '', ...block.values.map(v => {
        if (typeof v === 'string' && v.match(antecedantRegex)) {
            const codeBlockName = getAntecedants(v)[0]
            
            const referencedCodeBlock = blocks.find(b => b.name === codeBlockName && b.type === 'CODE');
            
            if (referencedCodeBlock && referencedCodeBlock.type === 'CODE') {
                return referencedCodeBlock;
            }
        }
        return v
    })]
}

function setUpFooter(region: Region): Region {
    // Did the region we just terminate have a footer? If so set that up
    if (region.hasFooter) {
        // remove the last row from the data array and use it as the footer
        const footerRow = region.data.pop()
        if (footerRow) {
            region.footer = footerRow.map((cell) => {
                // Return numbers as is
                if (typeof cell === 'number') {
                    return cell
                } else { // otherwise coerce to strings
                    // This will result in Code Blocks being rendered as `Object` when they are in a footer
                    return `${cell}`
                }
            });
        }
    }
    return region
}

export function runBlockAndDependants(block: BlockImpl, blocks: BlockImpl[], feature: Feature): BlockImpl[] {
    if (block.type === 'CODE') {
        block.values = runPythonCode(block.code, blocks, block.name, feature)

        const dag = buildDag(blocks);

        try {
            const toRun = dag.getSubGraphStartingFrom(block.name).topologicallySortedNodes()
    
            toRun.forEach(block => {
                if (block && block.type === 'CODE') {
                    block.values = runPythonCode(block.code, blocks, block.name, feature)
                }
            })
        } catch (e) {
            console.error(e, dag, block.name)
        }
    }
    return blocks
}

export function runPythonCode(code: string, blocks: BlockImpl[], name: string, feature: Feature): (string | number | undefined)[] {
    console.log('runPythonCode', name);

    const vars: { [Key: string]: (number | string | undefined)[] } = {};

    blocks.forEach(b => {
        if (b.type === 'CODE' && b.name != name) {
            vars['kalamata_var_' + b.name] = b.values
        }
    });

    feature.getAttributesMap().forEach((attr, key) => {
        const value = attr.getValue()
        if (value && attr.hasValue()) {
            const valueJS = value.toJavaScript()
            if (typeof valueJS == 'number' || typeof valueJS == 'string') {
                vars['kalamata_var_' + key.toLowerCase()] = [valueJS];
            }
        }
    })

    let temp: any = undefined
    const output = runPy(code, vars);
    try {
        console.log('OUTPUT', output);
        temp = JSON.parse(output)
    } catch (e) {
        temp = `Error parsing: ${e.toString()}. \t\n Python output was: ${output}`
    }

    if (!Array.isArray(temp)) {
        temp = [temp]
    }
    
    return temp.filter((t: (string | number | null | undefined)) => t != null)
}

export function getProtoDag(series: AllSeries, f: Feature): Feature {
    const dag = buildDag(seriesToBlocks(series));

    return dagToProtobuf(dag, f);
}

const antecedantRegex = /((kalamata)|(workbook))[\.\[]\'?\"?([a-z_0-9]+)/g

export function getAntecedants(code: string) {
    const names = Array.from(code.matchAll(antecedantRegex)).map(match => match[4])
    return names;
}

function buildDag(blocks: BlockImpl[]): Dag {
    let dag = new DirectedAcyclicGraph<BlockImpl>(s => (s || {name: 'BLANK'}).name)

    blocks.forEach(block => {
        dag.upsert(block)

        if (block.type === 'CODE') {
            const antecedants = getAntecedants(block.code);

            antecedants.map(a => blocks.find(b => b.name === a)).forEach(a => {
                if (!a) {
                    return;
                }
                dag.upsert(a)
                dag.addEdge(a.name, block.name)
            })
        }
    })
    
    return dag
}


// Takes a DAG and an optional existing Feature and then adds the attributes from 
// the DAG to the attributes map on the feature.
export function dagToProtobuf(dag: Dag, f?: Feature) {
    const feat = (f || new Feature())
    const m = feat.getAttributesMap();
    const graph = new Graph();
    
    const dagElems = dag.getNodes((o1, o2) => o1.order - o1.order)

    dagElems.map((elem) => {
        if (elem.type === 'CODE') {
            const vert = new Vertex()
            vert.setExpression(elem.code)
            vert.setName(elem.name)
            vert.setDescription(elem.description)
            vert.setValuesList(elem.values.map(v => `${v}`))
            vert.setFormatsList([elem.format])
            graph.addVertices(vert)
        } else if (elem.type === 'REGION') {
            const vert = new Vertex()
            vert.setExpression(elem.type)
            vert.setName(elem.name)
            vert.setDescription(elem.description)
            vert.setValuesList([ JSON.stringify(elem) ])
            graph.addVertices(vert)
        } else if (elem.type === 'TEXT') {
            const vert = new Vertex()
            vert.setExpression(elem.type)
            vert.setName(elem.name)
            vert.setDescription(elem.description)
            vert.setValuesList([elem.text])
            graph.addVertices(vert)
        }
    })
    const value = new Attribute()
    value.setGraph(graph);
    m.set('Root_DAG', value);
    
    return feat;
}

export function featureToSeries(f: Feature, periods: number): AllSeries {
    const staticSeries: Dict<Series> = {};
    const dynamicSeries: Dict<Series> = {};
    

    f.getAttributesMap().forEach((v, k) => {
        const name = k.toLowerCase();
        if (v.hasValue()) {
            const value = v.getValue()?.toJavaScript();

            staticSeries[name] = {
                name: name,
                description: name,
                code: '',
                isStatic: true,
                values: new Array(periods).fill({ value: value?.toString() })
            }
        } else if (v.hasGraph()) {
            const dag = (v.getGraph() || new Graph());

            dag.getVerticesList()?.forEach(v => {
                const formats: ('dollars' | 'percent' | 'none')[] = v.getFormatsList()?.map(f => {
                    if (f == 'dollars') {
                        return 'dollars'
                    } else if (f == 'percent') {
                        return 'percent'
                    }

                    return 'none'
                });

                // console.log(v.toObject())
                const valuesWithFormats = v.getValuesList()?.map((v, i) => ({ value: v, format: formats[i] || 'none' }))
                dynamicSeries[v.getName()] = {
                    name: v.getName(),
                    code: v.getExpression(),
                    values: valuesWithFormats,
                    initial: v.getInitial(),
                    description: v.getDescription(),
                }
            })

        }
    })

    const series: Dict<Series> = { ...staticSeries, ...dynamicSeries };

    return series;

}

export function runAllSeriesThatDependOnAttr(series: AllSeries, f: Feature): AllSeries {
    const blocks = seriesToBlocks(series);
    const dag = buildDag(blocks);

    let i = 0;

    dag.topologicallySortedNodes().map(elem => {
        if (!elem || elem.type !== 'CODE') {
            return;
        }
        if (elem.code.match(/get_attr\(/g)) {
            i++;

            const block = blocks.find(b => b.name === elem.name);


            if (block)
                runBlockAndDependants(block, blocks, f)
        }
    })

    return series;
}