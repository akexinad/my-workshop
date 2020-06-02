import React, { FC, useState, useEffect } from "react";
import { ILineChartData } from "../../interfaces";
import {
    VictoryChart,
    VictoryLine,
    VictoryAxis,
    VictoryScatter,
    Background,
    Rect,
    VictoryTheme
} from "victory";

import { CHART_BC_COLOR } from "../../constants";
import ChartBackground from "./ChartBackground";

interface ILineChartVictoryProps {
    data: Array<ILineChartData>;
    color: string;
}

const LineChartVictory: FC<ILineChartVictoryProps> = (props) => {
    const { data, color } = props;

    const [tickLength, setTickLength] = useState(0);
    const [theme, setTheme] = useState(VictoryTheme.material)

    useEffect(() => {

        // setTheme(prevState => {
        //     if (!prevState.axis?.style?.axis) return;
            
        //     prevState.axis.style.axis.stroke = "none";

        //     return prevState;
        // });
        
    }, [])

    return (
        <div style={{width: "100%"}}>
            <VictoryChart
                // theme={VictoryTheme.material}
                // style={{
                //     background: {
                //         fill: "none"
                //     }
                // }}
                // backgroundComponent={
                //     <ChartBackground
                //         key={1234}
                //         tickLength={tickLength}
                //         data={data}
                //         {...props}
                //     />
                // }
            >
                <VictoryAxis
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={data.map((item) => item.x)}
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
                        console.log('ticks', ticks)
                        
                        return `${tick / 1000000}m`;
                    }}
                />
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
            </VictoryChart>
        </div>
    );
};

export default LineChartVictory;
