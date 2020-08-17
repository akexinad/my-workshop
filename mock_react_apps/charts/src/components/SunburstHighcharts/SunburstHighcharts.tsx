import React, { FC, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { produce } from "immer";

import { ISunburstData, ISunburstChartOptions } from "../../interfaces";

import { sunburstChartOptions } from "./sunburstChartOptions";

HighchartsSunburst(Highcharts);

interface SunburstHighchartsProps {
    data: Array<ISunburstData>;
}

export const SunburstHighcharts: FC<SunburstHighchartsProps> = (props) => {
    const { data} = props;
    
    const [options, setOptions] = useState<ISunburstChartOptions>(
        sunburstChartOptions
    );

    useEffect(() => {
        const newOpts = produce(options, (draft: any) => {
            draft.series[0].data = data;
        });

        setOptions(newOpts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const _handleClick = () => {
        const newOpts = produce(options, (draft: any) => {
            draft.series[0].data.map((country: any) => {
                if (country.name === "Italy") {
                    return (country.value = 1000000000);
                }

                return country;
            });
        });

        setOptions(newOpts);
    };

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <button onClick={_handleClick}>CHANGE DATA</button>
        </>
    );
};
