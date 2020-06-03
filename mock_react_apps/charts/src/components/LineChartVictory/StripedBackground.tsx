import React, { FC, useState, useEffect } from "react";

import { Background } from "victory";
import { ILineChartData } from "../../interfaces";

interface IChartBackgroundProps {
    colors: Array<string>;
    tickLength: number;
}

const StripedBackground: FC<IChartBackgroundProps> = (props) => {
    const { colors, tickLength } = props;

    const WIDTH = 370;
    const HEIGHT = 34;
    const INITIAL_Y_POSITION = 16;
    const Y_OFFSET = 33.5;

    const [positionArray, setPositionArray] = useState<Array<number>>([
        INITIAL_Y_POSITION
    ]);

    useEffect(() => {
        const newState = [INITIAL_Y_POSITION];

        for (let i = 0; i < tickLength - 1; i++) {
            const newOffset = INITIAL_Y_POSITION + (Y_OFFSET * (i + 1));
            newState.push(newOffset);
        }

        console.log('newState', newState)

        setPositionArray(newState);
    }, [tickLength]);

    const stripedBackground = positionArray.map((position, index) => {
        return (
            <Background
                key={index}
                {...props}
                // style={{ fill: index % 2 === 0 ? colors[0] : colors[1] }}
                style={{ fill: index % 2 === 0 ? "blue" : "red" }}
                width={WIDTH}
                height={HEIGHT}
                y={position}
            />
        );
    });

    return <>{stripedBackground}</>;
};

export default StripedBackground;
