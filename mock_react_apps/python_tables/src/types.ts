export type CB = {
  value: number;
  pythonScript: string;
};

export type RegionCell = string | CB | number;

export type RegionRow = Array<RegionCell>;

export interface PythonTable {
  headers: Array<string>;
  rows: Array<RegionRow>;
  footers: Array<string | number>;
}

export interface RegionColumn {
  Header: string;
  accessor: string;
  Cell?: any;
  Footer?: string;
  sticky?: "left" | "right";
}

export interface RegionTableRow {
  [key: string]: RegionCell;
}
