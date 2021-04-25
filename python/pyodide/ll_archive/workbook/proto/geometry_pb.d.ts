// package: geometry
// file: Geometry.proto

import * as jspb from "google-protobuf";

export class Point extends jspb.Message {
  getX(): number;
  setX(value: number): void;

  getY(): number;
  setY(value: number): void;

  getZ(): number;
  setZ(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Point.AsObject;
  static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Point;
  static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
  export type AsObject = {
    x: number,
    y: number,
    z: number,
  }
}

export class Line extends jspb.Message {
  hasStart(): boolean;
  clearStart(): void;
  getStart(): Point | undefined;
  setStart(value?: Point): void;

  hasEnd(): boolean;
  clearEnd(): void;
  getEnd(): Point | undefined;
  setEnd(value?: Point): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Line.AsObject;
  static toObject(includeInstance: boolean, msg: Line): Line.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Line, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Line;
  static deserializeBinaryFromReader(message: Line, reader: jspb.BinaryReader): Line;
}

export namespace Line {
  export type AsObject = {
    start?: Point.AsObject,
    end?: Point.AsObject,
  }
}

export class Chain extends jspb.Message {
  clearPointsList(): void;
  getPointsList(): Array<Point>;
  setPointsList(value: Array<Point>): void;
  addPoints(value?: Point, index?: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Chain.AsObject;
  static toObject(includeInstance: boolean, msg: Chain): Chain.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Chain, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Chain;
  static deserializeBinaryFromReader(message: Chain, reader: jspb.BinaryReader): Chain;
}

export namespace Chain {
  export type AsObject = {
    pointsList: Array<Point.AsObject>,
  }
}

export class Ring extends jspb.Message {
  clearPointsList(): void;
  getPointsList(): Array<Point>;
  setPointsList(value: Array<Point>): void;
  addPoints(value?: Point, index?: number): Point;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ring.AsObject;
  static toObject(includeInstance: boolean, msg: Ring): Ring.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Ring, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ring;
  static deserializeBinaryFromReader(message: Ring, reader: jspb.BinaryReader): Ring;
}

export namespace Ring {
  export type AsObject = {
    pointsList: Array<Point.AsObject>,
  }
}

export class Shape extends jspb.Message {
  hasExterior(): boolean;
  clearExterior(): void;
  getExterior(): Ring | undefined;
  setExterior(value?: Ring): void;

  clearHolesList(): void;
  getHolesList(): Array<Ring>;
  setHolesList(value: Array<Ring>): void;
  addHoles(value?: Ring, index?: number): Ring;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Shape.AsObject;
  static toObject(includeInstance: boolean, msg: Shape): Shape.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Shape, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Shape;
  static deserializeBinaryFromReader(message: Shape, reader: jspb.BinaryReader): Shape;
}

export namespace Shape {
  export type AsObject = {
    exterior?: Ring.AsObject,
    holesList: Array<Ring.AsObject>,
  }
}

export class Prism extends jspb.Message {
  hasBase(): boolean;
  clearBase(): void;
  getBase(): Shape | undefined;
  setBase(value?: Shape): void;

  getHeight(): number;
  setHeight(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Prism.AsObject;
  static toObject(includeInstance: boolean, msg: Prism): Prism.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Prism, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Prism;
  static deserializeBinaryFromReader(message: Prism, reader: jspb.BinaryReader): Prism;
}

export namespace Prism {
  export type AsObject = {
    base?: Shape.AsObject,
    height: number,
  }
}

export class Solid extends jspb.Message {
  clearFacesList(): void;
  getFacesList(): Array<Shape>;
  setFacesList(value: Array<Shape>): void;
  addFaces(value?: Shape, index?: number): Shape;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Solid.AsObject;
  static toObject(includeInstance: boolean, msg: Solid): Solid.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Solid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Solid;
  static deserializeBinaryFromReader(message: Solid, reader: jspb.BinaryReader): Solid;
}

export namespace Solid {
  export type AsObject = {
    facesList: Array<Shape.AsObject>,
  }
}

