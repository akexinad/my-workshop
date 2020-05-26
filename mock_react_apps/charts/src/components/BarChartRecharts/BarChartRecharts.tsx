import React, { FC } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
// import { data3 } from "../../data/data";

interface BarChartContainerProps {
    data: ReadonlyArray<any>;
    width: number;
    height: number;
    xAxisKey: string;
    barKey: string;
    barSize: number;
    colors: Array<string>;
}

const BarChartRecharts: FC<BarChartContainerProps> = (props) => {
    const {
        data,
        width,
        height,
        xAxisKey,
        barKey,
        barSize,
        colors
    } = props;

    if (colors.length < data.length) {
        console.error(`You need pass in at least ${data.length} colors`);
    }

    return (
        <BarChart width={width} height={height} data={data}>
            <XAxis dataKey={xAxisKey} stroke="#8884d8" />
            <YAxis width={100} />
            <Tooltip />
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
            <Bar
                dataKey={barKey}
                fill={colors[0]}
                barSize={barSize}
                radius={barSize / 2}
            />
        </BarChart>
    );
};

export default BarChartRecharts;
