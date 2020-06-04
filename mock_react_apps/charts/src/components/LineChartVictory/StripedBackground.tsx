import React, { FC, useState, useEffect } from "react";

import { Background } from "victory";
import { calculateProperties } from "./calculateProperties";

interface IChartBackgroundProps {
    colors: Array<string>;
    tickLength: number;
}

const StripedBackground: FC<IChartBackgroundProps> = (props) => {
    const { colors, tickLength } = props;

    console.log('tickLength', tickLength)

    const WIDTH = 370;
    const properties = calculateProperties(tickLength);

    const { height, initialYPosition, yOffset } = properties;

    const [positionArray, setPositionArray] = useState<Array<number>>([
        initialYPosition
    ]);

    useEffect(() => {
        if (height === 0) setPositionArray([]);

        const newState = [initialYPosition];

        for (let i = 0; i < tickLength; i++) {
            const newOffset = initialYPosition + yOffset * (i + 1);
            newState.push(newOffset);
        }

        setPositionArray(newState);
    }, [tickLength, height, initialYPosition, yOffset]);

    const stripedBackground = positionArray.map((position, index) => {
        return (
            <Background
                key={index}
                {...props}
                style={{ fill: index % 2 === 0 ? colors[0] : colors[1] }}
                width={WIDTH}
                height={height}
                y={position}
            />
        );
    });

    return positionArray.length === 0 ? (
        <>
            <Background key={positionArray.length} {...props} style={{ fill: "white" }} width={WIDTH} />
        </>
    ) : (
        <>{stripedBackground}</>
    );

};

export default StripedBackground;
