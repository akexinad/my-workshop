import React, { FC } from "react";
import { Treemap } from "recharts";

import { ICustomTreemapProps, IData } from "../../interfaces";

import TreemapContent from "../TreemapContent/TreemapContent";

/**
 const COLORS = [
   "#8889DD",
   "#9597E4",
   "#8DC77B",
   "#A5D297",
   "#E2CF45",
   "#F8C12D",
 ];
 * 
 */

interface TreemapChartProps {
  data: Array<IData>;
  colors: string[];
}

const TreemapChart: FC<TreemapChartProps> = ({ data, colors }) => {
  return (
    <Treemap
      width={400}
      height={200}
      data={data}
      dataKey="size"
      aspectRatio={4 / 3}
      stroke="#fff"
      fill="#8884d8"
      content={(props: ICustomTreemapProps) => {
        return <TreemapContent {...props} colors={colors} />;
      }}
    />
  );
};

export default TreemapChart;
