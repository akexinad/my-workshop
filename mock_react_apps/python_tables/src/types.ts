export type CB = {
  value: number;
  pythonScript: string;
};

export type RegionCell = string | CB | number | undefined;

export type RegionRow = Array<RegionCell>;

export interface RegionTable {
  headers?: Array<string>;
  rows: Array<RegionRow>;
  footers?: Array<string | number>;
}

export interface RegionTableColumn {
  Header: string;
  accessor: string;
  Cell?: any;
  Footer?: string | null;
  sticky?: "left" | "right";
}

export interface RegionTableRow {
  [key: string]: RegionCell;
}
