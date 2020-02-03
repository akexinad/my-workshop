import { TableColumn, TableRow } from "../utils/interfaces";

//Income tables
export const tableIncomeColumns: TableColumn[] = [
    {
        id: 'type',
        title: "Unit Types (Sales)",
        field: "type",
        editable: false,
        isVisible: true
    },
    {
        id: 'unitPrice',
        title: "Expected Sales Price Per Unit",
        field: "unitPrice",
        editable: true,
        isVisible: true
    },
    {
        id: 'qty',
        title: "Quantity",
        field: "qty",
        editable: false,
        isVisible: true
    }, {
        id: 'income',
        title: "Income",
        field: "income",
        editable: false,
        isVisible: true
    },
];

export const tableIncomeRows: TableRow[] = [
    {
        id: '1',
        name: "1Br1Ba-A (1 Bed, 1 Bath, 400 sq.ft)",
        input: 670000,
        quantity: 45,
        total: 30150000,
        isCalc: false,
        isNull: false
    },
    {
        id: '2',
        name: "2Br1Ba-A (2 Bed, 1 Bath, 540 sq.ft)",
        input: 780000,
        quantity: 62,
        total: 48360000,
        isCalc: false,
        isNull: false
    },
    {
        id: '3',
        name: "2Br2Ba-A (2 Bed, 2 Bath, 600 sq.ft)",
        input: 820000,
        quantity: 78,
        total: 63960000,
        isCalc: false,
        isNull: false
     }
     //,
    // {
    //     id: 'totals',
    //     name: '',
    //     input: 0,
    //     quantity: 185,
    //     total: 142470000,
    //     isCalc: false,
    //     isNull: false
    // }
];


//Expense tables
export const tableExpensesDevCostColumns: TableColumn[] = [
    { id: 'expenseitem', title: "Expense Item", isVisible: true },
    { id: 'expenserates', title: "Expense Rates", isVisible: true },
    { id: 'qty', title: "Value", isVisible: true },
    { id: 'expense', title: "Expense", isVisible: true }
];

export const tableExpensesDevCostRows: TableRow[] = [
    {
        id: 'landacquisition',
        name: "Land Acquisition",
        input: 0,
        quantity: 0,
        total: 0,
        isCalc: true,
        isNull: true
    },
    {
        id: '2',
        name: "Bid Costs",
        input: 0,
        quantity: 0,
        total: 100000,
        isCalc: false,
        isNull: true
    },
    {
        id: '3',
        name: "Infrastructure",
        input: 0,
        quantity: 0,
        total: 0,
        isCalc: false,
        isNull: true
    },
    {
        id: '4',
        name: "Public Domain",
        input: 0,
        quantity: 0,
        total: 0,
        isCalc: false,
        isNull: true
    }
    // ,
    // {
    //     id: 'totals',
    //     name: '',
    //     input: 0,
    //     quantity: 0,
    //     total: 42000000,
    //     isCalc: false,
    //     isNull: true
    // }
];


export const tableExpensesDesignColumns: TableColumn[] = [
    { id: 'item', title: "Item", isVisible: true },
    { id: 'expenserates', title: "Expense Rates", isVisible: true },
    { id: 'qty', title: "Qty", isVisible: true },
    { id: 'expense', title: "Expense", isVisible: true }
];

export const tableExpensesDesignRows: TableRow[] = [
    {
        id: '1',
        name: "D&C - Resi Area per sq.ft",
        input: 800,
        quantity: 74000,
        total: 59200000,
        isCalc: false,
        isNull: false
    },
    {
        id: '2',
        name: "D&C - Parking Area per sq.ft",
        input: 300,
        quantity: 10000,
        total: 3000000,
        isCalc: false,
        isNull: false
    }
    // ,
    // {
    //     id: 'totals',
    //     name: '',
    //     input: 0,
    //     quantity: 0,
    //     total: 62200000,
    //     isCalc: false,
    //     isNull: false
    // }

];

export const tableOtherDevCostsColumns: TableColumn[] = [
    {
        id: 'item',
        title: "Item",
        isVisible: true
    },
    {
        id: 'expenserates',
        title: "Expense Rates",
        isVisible: true
    },
    {
        id: 'qty',
        title: "Qty",
        isVisible: true
    },
    {
        id: 'expense',
        title: "Expense",
        isVisible: true
    }
];

export const tableOtherDevCostsRows: TableRow[] = [
    {
        id: '1',
        name: "Contingency (% of Construction, Bid and other development costs)",
        input: 15,
        quantity: 45,
        total: 675,
        isCalc: false,
        isNull: false
    }
    // ,
    // {
    //     id: 'totals',
    //     name: '',
    //     input: 0,
    //     quantity: 0,
    //     total: 104200675,
    //     isCalc: false,
    //     isNull: false
    // }

];

//Calculation functions
export const totalExpenseExcludeCalculatedValues = () => {
    let total = tableExpensesDevCostRows.filter(x => !x.isCalc).concat(tableExpensesDesignRows).concat(tableOtherDevCostsRows);
    return total.map(row => row.total).reduce((a, b) => a + b, 0);
}

export const totalExpense = () => {
    let total = tableExpensesDevCostRows.concat(tableExpensesDesignRows).concat(tableOtherDevCostsRows);
    return total.map(row => row.total).reduce((a, b) => a + b, 0);
}
export const totalIncome = () => {
    return tableIncomeRows.map(row => row.total).reduce((a, b) => a + b, 0);
}

export const getLandValue = (moc: number) => {
    if (moc != null && !isNaN(moc)) {
        return totalIncome() / (1 + moc / 100) - totalExpenseExcludeCalculatedValues()
    } else {
        return 0;
    }
}