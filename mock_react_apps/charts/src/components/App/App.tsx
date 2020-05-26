import React, { FC } from "react";
import "./App.css";
// import TreemapChart from "../TreemapChart/TreemapChart";
// import data, { data2, data3 } from "../../data";
// import BarChartRecharts from "../BarChartRecharts/BarChartRecharts";
// import BarChartGoogle from "../BarChartGoogle/BarChartGoogle";
// import BarChartVictory from "../BarChartVictory/BarChartVictory";
import DonutChartVictory from "../DonutChartVictory/DonutChartVictory";
import { mockRentalData } from "../../data/mockRentalData";

const data = [
    { type: "Studio", amount: "50000000" },
    { type: "1 Bedroom", amount: "25000000" },
    { type: "2 Bedrooms", amount: "25000000" }
];

const App: FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h2>Charts</h2>
                {/* <BarChartVictory /> */}
                <DonutChartVictory
                    isGrouped={false}
                    data={mockRentalData}
                    chartWidth={600}
                    x={"name"}
                    y={"amount"}
                />
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
