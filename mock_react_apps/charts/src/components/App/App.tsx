import React, { FC } from "react";
import "./App.css";
// import TreemapChart from "../TreemapChart/TreemapChart";
import data, { data2, data3 } from "../../data";
import BarChartRecharts from "../BarChartRecharts/BarChartRecharts";
import BarChartGoogle from "../BarChartGoogle/BarChartGoogle";

const COLORS = [
    "#8889DD",
    "#9597E4",
    "#8DC77B",
    "#A5D297",
    "#E2CF45",
    "#d40000"
];

const COLORS2 = ["#d40000", "#00ff00", "#000000", "#0000ff", "#ff9200"];

const App: FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h2>Charts</h2>
                <BarChartRecharts
                    data={data3}
                    width={1000}
                    height={400}
                    xAxisKey={"name"}
                    barKey={"pv"}
                    barSize={30}
                    colors={["#d40000"]}
                />
                <BarChartGoogle />
                {/* <TreemapChart data={data2} colors={COLORS2} /> */}
            </header>
        </div>
    );
};

export default App;
