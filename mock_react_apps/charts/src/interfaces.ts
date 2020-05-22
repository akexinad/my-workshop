export interface INode {
  name: string;
  size?: number;
  children?: Array<INode>;
}

export interface ITreemapNode {
  area: number;
  name: number;
  size: number;
  root: ITreemapNode;
  children: Array<ITreemapNode>;
  depth: number;
  height: number;
  index: number;
  value: number;
  width: number;
  x: number;
  y: number;
  z: boolean;
}

export interface ICustomTreemapProps {
  area: number;
  name: number;
  depth: number;
  fill: string;
  height: number;
  index: number;
  isAnimationActive: boolean;
  isUpdateAnimationActive: boolean;
  root: ITreemapNode;
  children: Array<ITreemapNode>;
  stroke: string;
  value: number;
  width: number;
  x: number;
  y: number;
  colors: Array<string>;
}