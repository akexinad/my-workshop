import React, { FC, Fragment } from "react";
import { ICustomTreemapProps } from "../../../interfaces";

const TreemapContent: FC<ICustomTreemapProps> = (props) => {
    const { root, depth, x, y, width, height, index, colors, name } = props;

    return (
        <Fragment>
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill:
                            depth < 2
                                ? colors[
                                      Math.floor(
                                          (index / root.children.length) * 6
                                      )
                                  ]
                                : "none",
                        stroke: "#fff",
                        strokeWidth: 2 / (depth + 1e-10),
                        strokeOpacity: 1 / (depth + 1e-10)
                    }}
                />
                {depth === 1 ? (
                    <text
                        x={x + width / 2}
                        y={y + height / 2 + 7}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={14}
                    >
                        {name}
                    </text>
                ) : null}
                {depth === 1 ? (
                    <text
                        x={x + 4}
                        y={y + 18}
                        fill="#fff"
                        fontSize={16}
                        fillOpacity={0.9}
                    >
                        {index + 1}
                    </text>
                ) : null}
            </g>
        </Fragment>
    );
};

export default TreemapContent;
