import React, { useEffect } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { VictoryThemeDefinition } from "../../interfaces";

const BarChartVictory = () => {
    const x = "quarter";
    const y = "earnings";

    const data = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ];

    useEffect(() => {
        if (!VictoryTheme.material.bar?.style?.data) return;

        VictoryTheme.material.bar.style.data.fill = "#d40000";
    }, []);

    const theme: VictoryThemeDefinition = {
        bar: {
            style: {
                data: {
                    fill: "#d40000"
                }
            }
        }
    };

    return (
        <>
            <h2>BarChartVictory</h2>
            <VictoryChart domainPadding={20} theme={theme}>
                <VictoryAxis
                    tickValues={[1, 2, 3, 4]}
                    tickFormat={[
                        "Quarter 1",
                        "Quarter 2",
                        "Quarter 3",
                        "Quarter 4"
                    ]}
                />
                <VictoryAxis
                    /**
                     * The independent variables usually go on the x-axis,
                     * which is why we flag the y-axis as dependent.
                     */
                    dependentAxis={true}
                    tickFormat={(y, x, yArray) => {
                        // console.log("y", y);
                        // console.log("x", x);
                        // console.log("foo", yArray);
                        return `$${y / 1000}k`;
                    }}
                />
                <VictoryBar
                    data={data}
                    x={x}
                    y={y}
                    // style={{
                    //     data: {
                    //         fill: "d40000"
                    //     }
                    // }}
                    cornerRadius={{
                        top: 15,
                        bottom: 15
                    }}
                />
            </VictoryChart>
        </>
    );
};

export default BarChartVictory;
