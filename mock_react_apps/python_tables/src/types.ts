export interface PythonRow {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
}

type CB = {
  value: number;
  pythonScript: string;
};

export type TableRow = Array<string | number | CB>;

export interface RegionTable {
  header: Array<string>;
  rows: Array<TableRow>;
  footer: Array<string | number>;
}
