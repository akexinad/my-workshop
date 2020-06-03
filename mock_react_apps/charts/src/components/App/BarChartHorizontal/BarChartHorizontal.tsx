import React, { FC } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel } from "victory";
import { mockRentalPredictionData } from "../../../data/mockRentalPredictionData";

interface IBarChartHorizontalProps {
    data: Array<any>;
    color: string;
}

const BarChartHorizontal: FC<IBarChartHorizontalProps> = (props) => {
    const { color } = props;

    const BAR_RADIUS = 5;

    const data = mockRentalPredictionData.map((item) => {
        return {
            x: item.type,
            // y: item.predictions[0].value
            y: item.predictions[0].value
        };
    });

    const yLabels = mockRentalPredictionData.map((item) => item.type);

    // console.log("yLabels", yLabels);

    return (
        <div style={{ width: "100%" }}>
            <h2>Horizontal Bar Chart</h2>
            <VictoryChart domainPadding={10}>
                <VictoryBar
                    horizontal
                    data={data}
                    x={"x"}
                    y={"y"}
                    style={{
                        data: {
                            width: 10,
                            fill: color
                        },
                        labels: {
                            fontSize: 10
                        }
                    }}
                    cornerRadius={{
                        top: BAR_RADIUS,
                        bottom: BAR_RADIUS
                    }}
                    labels={yLabels.map((item) => item)}
                    /**
                     * the 'd' prefix will make sure you move each label
                     * relatively to their existing position.
                     * 
                     * x does not need the 'd' prefix as all labels have
                     * the same starting position.
                     */
                    labelComponent={<VictoryLabel dy={-18} x={40} />}
                />
                <VictoryAxis
                    dependentAxis
                    style={{
                        axis: {
                            stroke: "none"
                        }
                    }}
                    tickFormat={tick => {
                        console.log(tick);
                        
                        return `$${tick / 1000}k`
                    }}
                />
            </VictoryChart>
        </div>
    );
};

export default BarChartHorizontal;
