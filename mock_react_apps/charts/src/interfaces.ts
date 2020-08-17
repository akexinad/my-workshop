import { SeriesSunburstOptions, PlotSunburstLevelsOptions, SeriesSunburstDataLabelsOptionsObject } from "highcharts";

interface ISunburstLevels extends PlotSunburstLevelsOptions {
    level: number;
    levelIsConstant?: boolean;
    colorByPoint?: boolean;
}

interface ISunburstOptionsSeries extends SeriesSunburstOptions {
    type: "sunburst";
    allowDrillToNode: boolean;
    data: Array<ISunburstData>;
    levels: Array<ISunburstLevels>;
}

export interface ISunburstChartOptions extends Highcharts.Options {
    series: Array<ISunburstOptionsSeries>;
}

export interface ISunburstData {
    id: string;
    parent: ISunburstData["id"];
    name: string;
    value?: number;
}

export interface INode {
    name: string;
    size?: number;
    children?: Array<INode>;
}

export interface ITreemapNode {
    area: number;
    name: number;
    size: number;
    root: ITreemapNode;
    children: Array<ITreemapNode>;
    depth: number;
    height: number;
    index: number;
    value: number;
    width: number;
    x: number;
    y: number;
    z: boolean;
}

export interface ICustomTreemapProps {
    area: number;
    name: number;
    depth: number;
    fill: string;
    height: number;
    index: number;
    isAnimationActive: boolean;
    isUpdateAnimationActive: boolean;
    root: ITreemapNode;
    children: Array<ITreemapNode>;
    stroke: string;
    value: number;
    width: number;
    x: number;
    y: number;
    colors: Array<string>;
}

export type ScatterSymbolType =
    | "circle"
    | "diamond"
    | "plus"
    | "minus"
    | "square"
    | "star"
    | "triangleDown"
    | "triangleUp";

export type OrientationTypes = "top" | "bottom" | "left" | "right";

export type TickProps = React.CSSProperties & { size?: number };

export type ThemeBaseProps = {
    width?: number;
    height?: number;
    colorScale?: string[];
    padding?: number;
    offsetX?: number;
    offsetY?: number;
};

export interface VictoryThemeDefinition {
    area?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    axis?: {
        style?: {
            axis?: React.CSSProperties;
            axisLabel?: React.CSSProperties;
            grid?: React.CSSProperties;
            ticks?: TickProps;
            tickLabels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    bar?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    boxplot?: {
        style?: {
            max?: React.CSSProperties;
            maxLabels?: React.CSSProperties;
            median?: React.CSSProperties;
            medianLabels?: React.CSSProperties;
            min?: React.CSSProperties;
            minLabels?: React.CSSProperties;
            q1?: React.CSSProperties;
            q1Labels?: React.CSSProperties;
            q3?: React.CSSProperties;
            q3Labels?: React.CSSProperties;
        };
        boxWidth?: number;
    } & ThemeBaseProps;
    candlestick?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
        candleColors?: {
            positive?: string;
            negative?: string;
        };
    } & ThemeBaseProps;
    chart?: ThemeBaseProps;
    dependentAxis?: {
        style?: {
            axis?: React.CSSProperties;
            axisLabel?: React.CSSProperties;
            grid?: React.CSSProperties;
            ticks?: TickProps;
            tickLabels?: React.CSSProperties;
        };
        orientation?: OrientationTypes;
    } & ThemeBaseProps;
    errorbar?: {
        borderWidth?: number;
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    group?: ThemeBaseProps;
    independentAxis?: {
        style?: {
            axis?: React.CSSProperties;
            axisLabel?: React.CSSProperties;
            grid?: React.CSSProperties;
            ticks?: TickProps;
            tickLabels?: React.CSSProperties;
        };
        orientation?: OrientationTypes;
    } & ThemeBaseProps;
    legend?: {
        gutter?: number;
        orientation?: "vertical" | "horizontal";
        titleOrientation?: OrientationTypes;
        style?: {
            data?: React.CSSProperties & {
                type?: ScatterSymbolType;
            };
            labels?: React.CSSProperties;
            title?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    line?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    pie?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    scatter?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
        };
    } & ThemeBaseProps;
    stack?: ThemeBaseProps;
    tooltip?: {
        style?: React.CSSProperties;
        flyoutStyle?: React.CSSProperties;
        cornerRadius?: number;
        pointerLength?: number;
    };
    voronoi?: {
        style?: {
            data?: React.CSSProperties;
            labels?: React.CSSProperties;
            flyout?: React.CSSProperties;
        };
    } & ThemeBaseProps;
}

export interface FinancialTableModel {
    title: string;
    columns: Column[];
    type: string;
    rows: Row[];
}

interface Row {
    id: string;
    name: string;
    rates: number;
    qty: number;
    amount: number;
    o: boolean;
}

interface Column {
    Header: string;
    accessor?: string;
    Footer?: string;
    tooltip?: Tooltip;
    aggregate?: string;
    cellType?: string;
    isEditable?: boolean;
}

interface Tooltip {
    title: Title;
    placement: string;
    arrowClass: string;
}

interface Title {
    type: string;
    key?: any;
    ref?: any;
    props: Props;
    _owner?: any;
    _store: Store;
}

interface Store {}

interface Props {
    children: string;
}

export interface IBarChartData {
    x: any;
    y: any;
}

export interface ILineChartData {
    x: any;
    y: any;
}
