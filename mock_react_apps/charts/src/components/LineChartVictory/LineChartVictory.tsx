import React, { FC, useState } from "react";
import { ILineChartData } from "../../interfaces";
import {
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryScatter,
} from "victory";

import { CHART_BC_COLOR } from "../../constants";
import StripedBackground from "./StripedBackground";

interface ILineChartVictoryProps {
    data: Array<ILineChartData>;
    color: string;
}

const LineChartVictory: FC<ILineChartVictoryProps> = (props) => {
    const { data, color } = props;

    const [tickLength, setTickLength] = useState(0);

    return (
        <div style={{ width: "100%" }}>
            <h2>Line Chart</h2>
            <VictoryChart
                /**
                 * For some reason you need to declare an empty
                 * background object for the backgroundComponent
                 */
                style={{ background: {} }}
                backgroundComponent={
                    <StripedBackground
                        colors={[CHART_BC_COLOR, "white"]}
                        tickLength={tickLength}
                    />
                }
            >
                <VictoryLine
                    style={{
                        data: {
                            stroke: color,
                            strokeWidth: 0.5
                        }
                    }}
                    data={data}
                />
                <VictoryScatter
                    style={{ data: { fill: color } }}
                    size={7}
                    data={data}
                />
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={data.map((item) => item.x)}
                    offsetY={30}
                />
                <VictoryAxis
                    dependentAxis={true}
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={(tick, _, ticks) => {
                        setTickLength(ticks.length);
                        return `${tick / 1000000}m`;
                    }}
                />
            </VictoryChart>
        </div>
    );
};

export default LineChartVictory;
