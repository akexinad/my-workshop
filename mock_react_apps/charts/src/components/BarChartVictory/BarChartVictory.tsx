import React, { FC } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
import { IBarChartData } from "../../interfaces";

interface IBarChartVictoryProps {
    data: Array<IBarChartData>;
    color: string | number;
}

const BarChartVictory: FC<IBarChartVictoryProps> = (props) => {
    const { data, color } = props;

    const BAR_RADIUS = 7;

    return (
        <div style={{ width: "50%" }}>
            <h2>Bar Chart</h2>
            <VictoryChart domainPadding={20}>
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={data.map((item) => item.x)}
                />
                <VictoryAxis
                    theme={VictoryTheme.material}
                    dependentAxis
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={(tick) => `$${tick / 1000000}m`}
                />
                <VictoryBar
                    // horizontal
                    data={data}
                    x={"x"}
                    y={"y"}
                    style={{
                        data: {
                            fill: color
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
