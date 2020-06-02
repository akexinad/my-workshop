import React, { FC, useEffect, ReactElement, useState } from "react";

import { Background } from "victory";
import { ILineChartData } from "../../interfaces";
import { CHART_BC_COLOR } from "../../constants";



interface IChartBackgroundProps {
    color: string;
    data: Array<ILineChartData>;
    tickLength: number;
}

const ChartBackground: FC<IChartBackgroundProps> = (props) => {
    const { data, color, tickLength } = props;

    const WIDTH = 350;

    const [background, setBackground] = useState<Array<ReactElement>>([]);

    useEffect(() => {
        let yPosition = 50;

        for (let i = 1; i < tickLength; i++) {
            // console.log('yPosition', yPosition)
            console.log(i);

            if (i === 2) {
                setBackground((prevState) => {
                    prevState.push(
                        <Background
                            {...props}
                            style={{ fill: "white" }}
                            width={WIDTH}
                            height={42}
                            y={(yPosition += 42)}
                        />
                    );

                    return prevState;
                });
            }

            if (i % 2 === 1) {
                setBackground((prevState) => {
                    prevState.push(
                        <Background
                            {...props}
                            style={{ fill: CHART_BC_COLOR }}
                            width={WIDTH}
                            height={42}
                            y={(yPosition += 42)}
                        />
                    );

                    return prevState;
                });
            }

            setBackground((prevState) => {
                prevState.push(
                    <Background
                        {...props}
                        style={{ fill: "white" }}
                        width={WIDTH}
                        height={42}
                        y={(yPosition += 42)}
                    />
                );

                return prevState;
            });
        }
    }, [props, data, tickLength]);

    // const renderBackground = (tickLength: number) => {
    //     const iterator = tickLength - 1;
    //     const components: Array<ReactElement> = [];
    //     let yPosition = 0;

    //     for (let i = 0; i < iterator - 1; i++) {
    //         if (i === 1) {
    //             components.push(
    //                 <Background
    //                     {...props}
    //                     style={{
    //                         fill: "white"
    //                     }}
    //                     width={WIDTH}
    //                     height={(yPosition += 50)}
    //                 />
    //             );
    //         }

    //         if (i % 2 === 0) {
    //             components.push(
    //                 <Background
    //                     {...props}
    //                     style={{
    //                         fill: CHART_BC_COLOR
    //                     }}
    //                     width={WIDTH}
    //                     height={(yPosition += 42)}
    //                 />
    //             );
    //         }

    //         if (i % 2 === 0) {
    //             components.push(
    //                 <Background
    //                     {...props}
    //                     style={{
    //                         fill: "white"
    //                     }}
    //                     width={WIDTH}
    //                     height={(yPosition += 42)}
    //                 />
    //             );
    //         }
    //     }

    //     return components;
    // };

    // return <>{background}</>;

    return (
        <>
            <Background
                {...props}
                style={{ fill: CHART_BC_COLOR }}
                width={WIDTH}
                height={42}
                y={50}
            />
            <Background
                {...props}
                style={{ fill: "red" }}
                width={WIDTH}
                height={42}
                y={50 + 42}
            />
            <Background
                {...props}
                style={{ fill: CHART_BC_COLOR }}
                width={WIDTH}
                height={42}
                y={50 + 42 + 42}
            />
            <Background
                {...props}
                style={{ fill: "red" }}
                width={WIDTH}
                height={41}
                y={50 + 42 + 42 + 42}
            />
            <Background
                {...props}
                style={{ fill: CHART_BC_COLOR }}
                width={WIDTH}
                height={41}
                y={50 + 42 + 42 + 42 + 41}
            />
            <Background
                {...props}
                style={{ fill: "red" }}
                width={WIDTH}
                height={42}
                y={50 + 42 + 42 + 42 + 42 + 40}
            />
        </>
    );
};

export default ChartBackground;
