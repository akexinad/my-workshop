export interface TableColumn {
  id: string;
  title: string;
  field?: string;
  editable?: boolean;
  isVisible: boolean;
}

export interface TableRow {
  id: string;
  name: string;
  input: number;
  quantity: number;
  total: number;
  isCalc: boolean;
  isNull: boolean;
}

export type FinanceTableTitle =
  | "Unit Sales"
  | "Development Costs"
  | "Design And Construction Costs"
  | "Other Develeopment Costs";
