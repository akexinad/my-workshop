import React, {useEffect, useState} from 'react'

import ReactDataSheet from 'react-datasheet'
import { omitBy } from 'lodash'

import useWorkbookStore from '../../state/workbookStore'

import ContextMenu from '../ContextMenu/ContextMenu'
import { SeriesValue, GridElement } from '../../types'

const CellFactory = (onDblClick: () => void, trackUpdates: boolean | undefined, periodsToCalculate: number, loadSeries: (s: string, c: string, v: SeriesValue[], i: number | undefined) => void, { cell, className, onMouseDown, onMouseOver, row, col }: ReactDataSheet.CellRendererProps<GridElement, number>) => {
    const [state, actions] = useWorkbookStore();

    const [newValue, setNewValue] = useState(false)

    useEffect(() => {
        if (trackUpdates && row > 1 && col > 0) {
            if (cell.value.changed) {
                cell.value.changed = false;
                requestAnimationFrame(() => {
                    setNewValue(true)
                })

                setTimeout(() => {
                    requestAnimationFrame(() => {
                        setNewValue(false)
                    })
                }, 10000)
            }
        }
    }, [cell.value.changed, col, row])

    return (
        <td onDoubleClick={ onDblClick } onContextMenu={(evt) => {
            evt.preventDefault();
            evt.stopPropagation();
            if (cell.isSeriesName && !cell.isEditing && !(cell.isStatic)) {
                const seriesName: string = cell.value.value
                ContextMenu(evt.clientX, evt.clientY, [{
                    name: 'Delete Series', onClick: () => {
                        actions.setSeries(omitBy(state.series, (s, _) => s.name === seriesName))
                    }
                }, {
                    name: 'Edit Series', onClick: () => {
                        const s = state.series[seriesName]
                        loadSeries(s.name, s.code, s.values, s.initial)
                    }
                }]);
            }
        }} colSpan={1} className={className + (newValue ? ' new' : '') + (cell.isEditing ? ' selected' : '') + (cell.isStatic ? ' static' : '')} onMouseDown={onMouseDown} onMouseOver={onMouseOver} style={{ display: cell.hidden ? 'none' : 'table-cell' }}>{cell.value.value}</td>
    )
}

export default CellFactory