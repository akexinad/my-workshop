import React, { FC, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { produce } from "immer";

import { ISunburstData } from "../../interfaces";

HighchartsSunburst(Highcharts);

interface SunburstHighchartsProps {
    options: any;
    data: Array<ISunburstData>;
}

export const SunburstHighcharts: FC<SunburstHighchartsProps> = ({
    options,
    data
}) => {
    const [sunburstOptions, setSunburstOptions] = useState(options);

    useEffect(() => {
        if (!sunburstOptions.series[0].data.length) {
            const newOptions = produce(sunburstOptions, (draft: any) => {
                draft.series[0].data = data;
            });

            console.log("newOptions", newOptions);

            setSunburstOptions(newOptions);
        }

        console.log("sunburstOptions", sunburstOptions);
    }, [data, sunburstOptions]);

    const _handleClick = () => {
        const newOptions = produce(sunburstOptions, (draft: any) => {
            draft.series[0].data.map((country: any) => {
                if (country.name === "Italy") {
                    return (country.value = 1000000000);
                }

                return country;
            });
        });

        setSunburstOptions(newOptions);
    };

    return (
        <>
            <HighchartsReact highcharts={Highcharts} options={sunburstOptions} />
            <button onClick={_handleClick}>CHANGE DATA</button>
        </>
    );
};
