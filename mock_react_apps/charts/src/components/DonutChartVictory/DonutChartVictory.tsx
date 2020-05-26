import React, { FC, useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryLegend } from "victory";
import { ELI_COLORS } from "../../constants";
import { FinancialTableModel } from "../../interfaces";

interface DonutChartVictoryProps {
    isGrouped: boolean;
    data: FinancialTableModel;
    chartWidth: number;
    x: string;
    y: string;
}

const DonutChartVictory: FC<DonutChartVictoryProps> = (props) => {
    const { data, chartWidth, x, y } = props;

    const [financeData, setFinanceData] = useState(data.rows);

    data.rows.forEach((row) => (row.amount = row.rates * row.qty));

    useEffect(() => {
        // const copy = [...financeData];

        // copy.forEach((item) => {
        //     item.amount = item.rates * item.qty;
        // });

        setFinanceData((prevState) => {
            prevState.forEach((item) => {
                item.amount = item.rates * item.qty;
            });

            return prevState;
        });

        console.log("financeData", financeData);
    }, [financeData]);

    // console.log("data", data);

    const legendData = data.rows.map((item, index) => {
        return {
            name: item.name,
            symbol: {
                fill: ELI_COLORS[index]
            }
        };
    });

    return (
        <div style={{ width: chartWidth }}>
            <h2 style={{ color: "black" }}>
                Victory Pie in the sky while im high
            </h2>
            <svg viewBox="0 0 700 400">
                <VictoryPie
                    standalone={false}
                    colorScale={ELI_COLORS}
                    data={data.rows}
                    // data={newData}
                    innerRadius={120}
                    x={x}
                    y={y}
                    style={{
                        labels: {
                            visibility: "hidden"
                        }
                    }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x={200}
                    y={190}
                    style={{ fontSize: 20, maxWidth: "100px" }}
                    text={[
                        `$100,000,000`,
                        " ",
                        "total rental income",
                        "by unit family per year"
                    ]}
                />
                <VictoryLegend
                    standalone={false}
                    itemsPerRow={10}
                    data={legendData}
                    rowGutter={-10}
                    x={370}
                    y={150}
                />
            </svg>
        </div>
    );
};

export default DonutChartVictory;
