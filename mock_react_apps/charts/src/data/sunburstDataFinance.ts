import { ISunburstData } from "../interfaces";

export const sunburstDataFinance: Array<ISunburstData> = [
    {
        id: "fin001",
        parent: "",
        name: "Unit Rental Income",
        value: 1900000
    },
    {
        id: "fin002",
        parent: "",
        name: "Other Rental Income",
        value: 500000
    },
    {
        id: "fin011",
        parent: "fin001",
        name: "2 Bed",
        value: 1000000
    },
    {
        id: "fin012",
        parent: "fin001",
        name: "1 bed",
        value: 500000
    },
    {
        id: "fin013",
        parent: "fin001",
        name: "Studio",
        value: 300000
    },
    {
        id: "fin014",
        parent: "fin001",
        name: "3 Bed",
        value: 100000
    },
    {
        id: "fin015",
        parent: "fin002",
        name: "Storage",
        value: 250000
    },
    {
        id: "fin016",
        parent: "fin002",
        name: "Parking",
        value: 200000
    },
    {
        id: "fin017",
        parent: "fin002",
        name: "Other",
        value: 100000
    }
];

// {
//     id: "",
//     parent: "",
//     name: "",
//     value:
// },
