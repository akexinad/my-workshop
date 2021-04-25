import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";
import ReactDataSheet from "react-datasheet";
import { Feature, Forest } from "../proto/element_pb";
import { DirectedAcyclicGraph } from 'typescript-graph'

export interface SeriesValue {
  value: string;
  format?: "none" | "dollars" | "percent";
  changed?: boolean;
}

export interface Series {
  name: string;
  code: string;
  values: Array<SeriesValue>;
  initial?: number;
  isStatic?: boolean;
  description: string;
}

export interface Dict<T> {
  [Key: string]: T;
}


export type Dag = DirectedAcyclicGraph<BlockImpl>;

export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: SeriesValue;
  isSeriesName?: boolean;
  isConstant?: boolean;
  hidden?: boolean;
  isEditing?: boolean;
  isNew?: boolean;
  isStatic?: boolean;
}

interface Block {
  name: string;
  description: string;
  order: number;
}

export interface CB extends Block {
  type: "CODE";
  format: "none" | "dollars" | "percent";
  values: (string | number | undefined)[];
  code: string;
}

export interface TB extends Block {
  type: "TEXT";
  values?: { value: string }[];
  text: string;
}

export interface FB extends Block {
  type: "FEATURE";
  feature: Feature;
}

export interface CFB extends Block {
  type: "CREATE_FEATURE";
  position: { x: number; y: number; z: number };
  size: { height: number; width: number; length: number };
}

export interface RB extends Block {
  type: "REGION";
  frozenColumns: number;
  hasHeader: boolean;
  hasFooter: boolean;
}

export type BlockImpl = TB | CB | FB | CFB | RB;

export type RegionCell = string | CB | number | undefined;

export type RegionBlockRow = Array<RegionCell>;

export interface RegionTableColumn {
  Header: string;
  accessor: string;
  Cell?: any;
  Footer?: string | null;
  sticky?: "left" | "right";
}

export type RegionTableRow = {
  /**
   * the keys will be the names of
   * the column accessors
   */
  [key: string]: RegionCell;
};

export interface FinancialTable {
  columns: RegionTableColumn[];
  rows: RegionTableRow[];
}

export interface Region extends RB {
  header?: Array<string | number>;
  footer?: Array<string | number>;
  startDate?: string;
  endDate?: string;
  data: Array<RegionBlockRow>;
}

export interface Workbook {
  id?: string;
  scenarioId?: string;
  created?: Date;
  updated?: Date;
  userId?: string;
  forest?: string;
  buildingId?: string;
}

export type CSSClasses = {
  readonly [key: string]: string;
};

declare global {
  interface Window {
    flows: {
      set: boolean;
      value: {
        name: string;
        values: number[];
      };
    };
    attr: {
      set: boolean;
      value: {
        name: string;
        value: number;
      };
    };
    setAttr: (name: string, value: number) => void;
    setFlow: (name: string, values: number[]) => void;
    getAttr: (name: string) => any;
    getForest: () => Forest.AsObject;
    getFlow: (
      name: string
    ) => {
      amounts: number[];
      dates: (Timestamp | undefined)[];
    };
    getChildFlows: (
      name: string
    ) => { amounts: number[]; dates: (Timestamp | undefined)[] };
  }
}
