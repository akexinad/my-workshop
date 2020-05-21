export interface INode {
  name: string;
  size: number;
}

export interface IParent {
  name: string;
  children: Array<INode>;
}

export interface IData {
  name: string;
  children: Array<IParent | INode> | null;
}

export interface ICustomTreemapRoot {
  area: number;
  name: number;
  size: number;
  root: ICustomTreemapRoot;
  children: Array<ICustomTreemapRoot>;
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
  root: ICustomTreemapRoot;
  children: Array<ICustomTreemapRoot>;
  stroke: string;
  value: number;
  width: number;
  x: number;
  y: number;
  colors: Array<string>;
}