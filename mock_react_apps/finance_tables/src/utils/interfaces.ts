import { Column } from "react-table";

export interface TableColumn {
  id: string;
  title: string;
}

export interface TableRow {
  id: string;
  name: string;
  input: number;
  quantity: number;
  total?: number;
}

export type FinanceTableTitle =
  | "Unit Sales"
  | "Development Costs"
  | "Design And Construction Costs"
  | "Other Develeopment Costs";

export interface MyColumn {
  Header: string;
  columns: {
    Header: string;
    accessor: string;
    editable: boolean;
  }[];
}

export interface Data {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: string;
  subrows: any;
}