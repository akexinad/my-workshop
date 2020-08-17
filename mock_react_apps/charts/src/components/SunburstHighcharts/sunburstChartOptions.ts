import { ISunburstChartOptions } from "../../interfaces";

export const sunburstChartOptions: ISunburstChartOptions = {
    chart: {
        height: "100%"
    },
    title: {
        text: "World population 2017"
    },
    subtitle: {
        text:
            'Source <href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
    },
    series: [
        {
            type: "sunburst",
            data: [],
            allowDrillToNode: true,
            cursor: "pointer",
            dataLabels: {
                format: "{point.name}",
                filter: {
                    property: "innerArcLength",
                    operator: ">",
                    value: 16
                },
                rotationMode: "auto"
            },
            levels: [
                {
                    level: 1,
                    levelIsConstant: false,
                    dataLabels: {
                        filter: {
                            property: "outerArcLength",
                            operator: ">",
                            value: 64
                        }
                    }
                },
                {
                    level: 2,
                    colorByPoint: true
                },
                {
                    level: 3,
                    colorVariation: {
                        key: "brightness",
                        to: -0.5
                    }
                },
                {
                    level: 4,
                    colorVariation: {
                        key: "brightness",
                        to: 0.5
                    }
                }
            ]
        }
    ],
    tooltip: {
        headerFormat: "",
        pointFormat:
            "The population of <b>{point.name}</b> is <b>{point.value}</b>"
    }
};
