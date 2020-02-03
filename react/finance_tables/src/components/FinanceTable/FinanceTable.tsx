import React from 'react';
import { FinanceTableTitle, TableColumn, TableRow } from '../../utils/interfaces';

interface FinanceTableProps {
    title: FinanceTableTitle;
    colums: TableColumn[];
    rows: TableRow[];
}

const FinanceTable = () => {


    return (
        <h3>Finance Table</h3>
    )
}

export default FinanceTable;