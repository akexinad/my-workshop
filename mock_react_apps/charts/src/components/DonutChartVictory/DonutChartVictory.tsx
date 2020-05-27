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
        setFinanceData((prevState) => {
            prevState.forEach((item) => {
                item.amount = item.rates * item.qty;
            });

            return prevState;
        });

        console.log("financeData", financeData);
    }, [financeData]);

    const legendData = data.rows.map((item, index) => {
        return {
            name: item.name,
            symbol: {
                fill: ELI_COLORS[index]
            }
        };
    });

    const SVG_HEIGHT = 400;

    return (
        <div style={{ width: chartWidth }}>
            <h2 style={{ color: "black" }}>
                Victory Pie in the sky while im high
            </h2>
            <svg viewBox={"0 0 700 " + SVG_HEIGHT}>
                <VictoryPie
                    standalone={false}
                    colorScale={ELI_COLORS}
                    data={data.rows}
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
                    itemsPerRow={15}
                    data={legendData}
                    rowGutter={-10}
                    x={370}
                    y={(SVG_HEIGHT - legendData.length * 20) / 2}
                    // y={0}
                />
            </svg>
        </div>
    );
};

export default DonutChartVictory;
