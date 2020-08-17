import React, { FC, useState, useEffect } from "react";

import { IBarChartData } from "../../interfaces";

// import data, { data2, data3 } from "../../data";
// import { mockRentalData } from "../../data/mockRentalData";
// import { mockRentalPredictionData } from "../../data/mockRentalPredictionData";
import { mockProfitData } from "../../data/mockProfitData";
import { sunburstDataWorldPopulation } from "../../data/sunburstDataWorldPop";

// import { WEIRD_BLUE } from "../../constants";
import { sunburstChartOptions } from "../SunburstHighcharts/sunburstChartOptions";

// import TreemapChart from "../TreemapChart/TreemapChart";
// import BarChartRecharts from "../BarChartRecharts/BarChartRecharts";
// import BarChartGoogle from "../BarChartGoogle/BarChartGoogle";
// import BarChartVictory from "../BarChartVictory/BarChartVictory";
// import DonutChartVictory from "../DonutChartVictory/DonutChartVictory";
// import LineChartVictory from "../LineChartVictory/LineChartVictory";
// import BarChartHorizontal from "./BarChartHorizontal/BarChartHorizontal";
import { SunburstHighcharts } from "../SunburstHighcharts/SunburstHighcharts";

import "./App.css";
import { sunburstDataFinance } from "../../data/sunburstDataFinance";

const App: FC = () => {
    // const data = [
    //     { type: "Studio", amount: "50000000" },
    //     { type: "1 Bedroom", amount: "25000000" },
    //     { type: "2 Bedrooms", amount: "25000000" }
    // ];

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
                <SunburstHighcharts data={sunburstDataWorldPopulation} options={sunburstChartOptions} />
                {/* <LineChartVictory data={data} color={WEIRD_BLUE} /> */}
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
