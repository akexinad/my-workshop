import React, { FC, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { produce } from "immer";

import { ISunburstData, ISunburstChartOptions } from "../../interfaces";

HighchartsSunburst(Highcharts);

interface SunburstHighchartsProps {
    options: ISunburstChartOptions;
    data: Array<ISunburstData>;
}

export const SunburstHighcharts: FC<SunburstHighchartsProps> = ({
    options,
    data
}) => {
    const [opts, setOpts] = useState(options);

    useEffect(() => {
        if (!opts.series[0].data.length) {
            const newOpts = produce(opts, (draft: any) => {
                draft.series[0].data = data;
            });


            setOpts(newOpts);
        }
    }, [data, opts]);

    const _handleClick = () => {
        const newOpts = produce(opts, (draft: any) => {
            draft.series[0].data.map((country: any) => {
                if (country.name === "Italy") {
                    return (country.value = 1000000000);
                }

                return country;
            });
        });

        setOpts(newOpts);
    };

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={opts} />
            <button onClick={_handleClick}>CHANGE DATA</button>
        </>
    );
};
