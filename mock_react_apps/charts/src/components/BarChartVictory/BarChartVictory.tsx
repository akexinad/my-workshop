import React, { useEffect, FC } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { VictoryThemeDefinition } from "../../interfaces";

interface IBarChartVictoryProps {
    data: Array<any>;
}

const BarChartVictory: FC<IBarChartVictoryProps> = (props) => {
    const { data } = props;

    const BAR_RADIUS = 11;

    const x = "year";
    const y = "profit";

    useEffect(() => {
        if (!VictoryTheme.material.bar?.style?.data) return;

        VictoryTheme.material.bar.style.data.fill = "#d40000";
    }, []);

    const theme: VictoryThemeDefinition = {
        bar: {
            style: {
                data: {
                    fill: "blue"
                }
            }
        }
    };

    return (
        <div style={{ width: "50%" }}>
            <h2>BarChartVictory</h2>
            <VictoryChart domainPadding={20}>
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={data.map((item) => item.year)}
                />
                
                <VictoryBar
                    data={data}
                    x={x}
                    y={y}
                    style={{
                        data: {
                            fill: "blue"
                        }
                    }}
                    cornerRadius={{
                        top: BAR_RADIUS,
                        bottom: BAR_RADIUS
                    }}
                />
            </VictoryChart>
        </div>
    );
};

export default BarChartVictory;
