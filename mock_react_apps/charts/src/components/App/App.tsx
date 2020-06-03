import React, { FC, useState, useEffect } from "react";
import "./App.css";
// import TreemapChart from "../TreemapChart/TreemapChart";
// import data, { data2, data3 } from "../../data";
// import BarChartRecharts from "../BarChartRecharts/BarChartRecharts";
// import BarChartGoogle from "../BarChartGoogle/BarChartGoogle";
import BarChartVictory from "../BarChartVictory/BarChartVictory";
// import DonutChartVictory from "../DonutChartVictory/DonutChartVictory";
// import { mockRentalData } from "../../data/mockRentalData";
import { mockProfitData } from "../../data/mockProfitData";
import { IBarChartData } from "../../interfaces";
import LineChartVictory from "../LineChartVictory/LineChartVictory";
import { WEIRD_BLUE } from "../../constants";
import BarChartHorizontal from "./BarChartHorizontal/BarChartHorizontal";
import { mockRentalPredictionData } from "../../data/mockRentalPredictionData";

// const data = [
//     { type: "Studio", amount: "50000000" },
//     { type: "1 Bedroom", amount: "25000000" },
//     { type: "2 Bedrooms", amount: "25000000" }
// ];

const App: FC = () => {
    const [data, setData] = useState<Array<IBarChartData>>([]);

    useEffect(() => {
        const profitData = mockProfitData.map((item) => {
            return {
                x: item.year,
                y: item.profit
            };
        });

        setData(profitData);

        return () => {};
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h2>Charts</h2>
                <LineChartVictory data={data} color={WEIRD_BLUE} />
                {/* <BarChartVictory data={data} color={WEIRD_BLUE} /> */}
                {/* <BarChartHorizontal
                    data={mockRentalPredictionData}
                    color={WEIRD_BLUE}
                /> */}
                {/* <BarChartVictory data={mockProfitData} /> */}
                {/* <DonutChartVictory
                    isGrouped={false}
                    data={mockRentalData}
                    chartWidth={600}
                    x={"name"}
                    y={"amount"}
                /> */}
                {/* <BarChartRecharts
                    data={data3}
                    width={1000}
                    height={400}
                    xAxisKey={"name"}
                    barKey={"pv"}
                    barSize={30}
                    colors={["#d40000"]}
                /> */}
                {/* <BarChartGoogle /> */}
                {/* <TreemapChart data={data2} colors={COLORS2} /> */}
            </header>
        </div>
    );
};

export default App;
