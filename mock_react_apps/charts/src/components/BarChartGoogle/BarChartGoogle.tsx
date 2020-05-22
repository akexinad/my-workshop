import React, { FC } from "react";
import Chart from "react-google-charts";

const BarChartGoogle: FC = () => {
    return (
        <Chart
            width={"700px"}
            height={"300px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={[
                ["Year", "Sales", "Expenses", "Profit"],
                ["2014", 1000, 400, 200],
                ["2015", 1170, 460, 250],
                ["2016", 660, 1120, 300],
                ["2017", 1030, 540, 350]
            ]}
            options={{
                // Material design options
                title: "Company Performance",
                chartArea: { width: "60%" },
                subtitle: "Sales, Expenses, and Profit: 2014-2017",
            }}
            // For tests
            rootProps={{ "data-testid": "2" }}
        />
    );
};

export default BarChartGoogle;
