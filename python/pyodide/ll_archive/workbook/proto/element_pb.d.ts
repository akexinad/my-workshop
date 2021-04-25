// package: element
// file: Protobuf/element.proto

import * as jspb from "google-protobuf";
import * as Protobuf_Geometry_pb from "../geometry_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class Guid extends jspb.Message {
  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Guid.AsObject;
  static toObject(includeInstance: boolean, msg: Guid): Guid.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Guid, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Guid;
  static deserializeBinaryFromReader(message: Guid, reader: jspb.BinaryReader): Guid;
}

export namespace Guid {
  export type AsObject = {
    value: string,
  }
}

export class Envelope extends jspb.Message {
  hasGeometry(): boolean;
  clearGeometry(): void;
  getGeometry(): Protobuf_Geometry_pb.Solid | undefined;
  setGeometry(value?: Protobuf_Geometry_pb.Solid): void;

  getType(): Envelope.TypeMap[keyof Envelope.TypeMap];
  setType(value: Envelope.TypeMap[keyof Envelope.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Envelope.AsObject;
  static toObject(includeInstance: boolean, msg: Envelope): Envelope.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Envelope, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Envelope;
  static deserializeBinaryFromReader(message: Envelope, reader: jspb.BinaryReader): Envelope;
}

export namespace Envelope {
  export type AsObject = {
    geometry?: Protobuf_Geometry_pb.Solid.AsObject,
    type: Envelope.TypeMap[keyof Envelope.TypeMap],
  }

  export interface TypeMap {
    UNKNOWN: 0;
    UNSPECIFIED: 1;
    PODIUM: 3;
    TOWER: 4;
  }

  export const Type: TypeMap;
}

export class Space extends jspb.Message {
  hasGeometry(): boolean;
  clearGeometry(): void;
  getGeometry(): Protobuf_Geometry_pb.Prism | undefined;
  setGeometry(value?: Protobuf_Geometry_pb.Prism): void;

  getType(): Space.TypeMap[keyof Space.TypeMap];
  setType(value: Space.TypeMap[keyof Space.TypeMap]): void;

  getUse(): Space.UseMap[keyof Space.UseMap];
  setUse(value: Space.UseMap[keyof Space.UseMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Space.AsObject;
  static toObject(includeInstance: boolean, msg: Space): Space.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Space, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Space;
  static deserializeBinaryFromReader(message: Space, reader: jspb.BinaryReader): Space;
}

export namespace Space {
  export type AsObject = {
    geometry?: Protobuf_Geometry_pb.Prism.AsObject,
    type: Space.TypeMap[keyof Space.TypeMap],
    use: Space.UseMap[keyof Space.UseMap],
  }

  export interface TypeMap {
    UNKNOWN: 0;
    APARTMENT: 1;
    COMPARTMENT: 2;
    BEDROOM: 3;
    FLOOR: 4;
    PARKING: 5;
    FOO: 6;
  }

  export const Type: TypeMap;

  export interface UseMap {
    UNCERTAIN: 0;
    NONSPECIFIC: 1;
    MIXED: 2;
    RESIDENTIAL: 3;
    COMMERCIAL: 4;
    RETAIL: 5;
    COMMUNITY: 6;
    HOTEL: 7;
  }

  export const Use: UseMap;
}

export class Region extends jspb.Message {
  hasGeometry(): boolean;
  clearGeometry(): void;
  getGeometry(): Protobuf_Geometry_pb.Shape | undefined;
  setGeometry(value?: Protobuf_Geometry_pb.Shape): void;

  getType(): Region.TypeMap[keyof Region.TypeMap];
  setType(value: Region.TypeMap[keyof Region.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Region.AsObject;
  static toObject(includeInstance: boolean, msg: Region): Region.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Region, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Region;
  static deserializeBinaryFromReader(message: Region, reader: jspb.BinaryReader): Region;
}

export namespace Region {
  export type AsObject = {
    geometry?: Protobuf_Geometry_pb.Shape.AsObject,
    type: Region.TypeMap[keyof Region.TypeMap],
  }

  export interface TypeMap {
    UNKNOWN: 0;
    UNSPECIFIED: 1;
    SITE: 2;
    FOOTPRINT: 3;
    OPENSPACE: 4;
    PARKINGLOT: 5;
  }

  export const Type: TypeMap;
}

export class Position extends jspb.Message {
  hasGeometry(): boolean;
  clearGeometry(): void;
  getGeometry(): Protobuf_Geometry_pb.Point | undefined;
  setGeometry(value?: Protobuf_Geometry_pb.Point): void;

  getType(): Position.TypeMap[keyof Position.TypeMap];
  setType(value: Position.TypeMap[keyof Position.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Position.AsObject;
  static toObject(includeInstance: boolean, msg: Position): Position.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Position, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Position;
  static deserializeBinaryFromReader(message: Position, reader: jspb.BinaryReader): Position;
}

export namespace Position {
  export type AsObject = {
    geometry?: Protobuf_Geometry_pb.Point.AsObject,
    type: Position.TypeMap[keyof Position.TypeMap],
  }

  export interface TypeMap {
    UNKNOWN: 0;
    UNSPECIFIED: 1;
    CENTROID: 2;
    COORDINATES: 3;
  }

  export const Type: TypeMap;
}

export class Path extends jspb.Message {
  hasGeometry(): boolean;
  clearGeometry(): void;
  getGeometry(): Protobuf_Geometry_pb.Chain | undefined;
  setGeometry(value?: Protobuf_Geometry_pb.Chain): void;

  getType(): Path.TypeMap[keyof Path.TypeMap];
  setType(value: Path.TypeMap[keyof Path.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Path.AsObject;
  static toObject(includeInstance: boolean, msg: Path): Path.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Path, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Path;
  static deserializeBinaryFromReader(message: Path, reader: jspb.BinaryReader): Path;
}

export namespace Path {
  export type AsObject = {
    geometry?: Protobuf_Geometry_pb.Chain.AsObject,
    type: Path.TypeMap[keyof Path.TypeMap],
  }

  export interface TypeMap {
    UNKNOWN: 0;
    UNSPECIFIED: 1;
    ROADCENTRELINE: 2;
    PARCELBOUNDARY: 3;
  }

  export const Type: TypeMap;
}

export class Group extends jspb.Message {
  getType(): Group.TypeMap[keyof Group.TypeMap];
  setType(value: Group.TypeMap[keyof Group.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Group.AsObject;
  static toObject(includeInstance: boolean, msg: Group): Group.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Group, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Group;
  static deserializeBinaryFromReader(message: Group, reader: jspb.BinaryReader): Group;
}

export namespace Group {
  export type AsObject = {
    type: Group.TypeMap[keyof Group.TypeMap],
  }

  export interface TypeMap {
    UNKNOWN: 0;
    ROOT: 1;
    PROJECT: 2;
    SCENARIO: 3;
    STRUCTURE: 4;
  }

  export const Type: TypeMap;
}

export class Movement extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): Guid | undefined;
  setId(value?: Guid): void;

  hasDate(): boolean;
  clearDate(): void;
  getDate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setDate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getUnits(): UnitsMap[keyof UnitsMap];
  setUnits(value: UnitsMap[keyof UnitsMap]): void;

  getAmount(): number;
  setAmount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Movement.AsObject;
  static toObject(includeInstance: boolean, msg: Movement): Movement.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Movement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Movement;
  static deserializeBinaryFromReader(message: Movement, reader: jspb.BinaryReader): Movement;
}

export namespace Movement {
  export type AsObject = {
    id?: Guid.AsObject,
    date?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    units: UnitsMap[keyof UnitsMap],
    amount: number,
  }
}

export class Flow extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): Guid | undefined;
  setId(value?: Guid): void;

  getName(): string;
  setName(value: string): void;

  clearMovementsList(): void;
  getMovementsList(): Array<Movement>;
  setMovementsList(value: Array<Movement>): void;
  addMovements(value?: Movement, index?: number): Movement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Flow.AsObject;
  static toObject(includeInstance: boolean, msg: Flow): Flow.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Flow, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Flow;
  static deserializeBinaryFromReader(message: Flow, reader: jspb.BinaryReader): Flow;
}

export namespace Flow {
  export type AsObject = {
    id?: Guid.AsObject,
    name: string,
    movementsList: Array<Movement.AsObject>,
  }
}

export class Node extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): Guid | undefined;
  setId(value?: Guid): void;

  hasFeatureid(): boolean;
  clearFeatureid(): void;
  getFeatureid(): Guid | undefined;
  setFeatureid(value?: Guid): void;

  hasParentid(): boolean;
  clearParentid(): void;
  getParentid(): Guid | undefined;
  setParentid(value?: Guid): void;

  clearChildrenidsList(): void;
  getChildrenidsList(): Array<Guid>;
  setChildrenidsList(value: Array<Guid>): void;
  addChildrenids(value?: Guid, index?: number): Guid;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Node.AsObject;
  static toObject(includeInstance: boolean, msg: Node): Node.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Node, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Node;
  static deserializeBinaryFromReader(message: Node, reader: jspb.BinaryReader): Node;
}

export namespace Node {
  export type AsObject = {
    id?: Guid.AsObject,
    featureid?: Guid.AsObject,
    parentid?: Guid.AsObject,
    childrenidsList: Array<Guid.AsObject>,
  }
}

export class Tree extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  hasRoot(): boolean;
  clearRoot(): void;
  getRoot(): Node | undefined;
  setRoot(value?: Node): void;

  getNodesMap(): jspb.Map<string, Node>;
  clearNodesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Tree.AsObject;
  static toObject(includeInstance: boolean, msg: Tree): Tree.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Tree, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Tree;
  static deserializeBinaryFromReader(message: Tree, reader: jspb.BinaryReader): Tree;
}

export namespace Tree {
  export type AsObject = {
    name: string,
    root?: Node.AsObject,
    nodesMap: Array<[string, Node.AsObject]>,
  }
}

export class Forest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getFeaturesMap(): jspb.Map<string, Feature>;
  clearFeaturesMap(): void;
  getTreesMap(): jspb.Map<string, Tree>;
  clearTreesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Forest.AsObject;
  static toObject(includeInstance: boolean, msg: Forest): Forest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Forest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Forest;
  static deserializeBinaryFromReader(message: Forest, reader: jspb.BinaryReader): Forest;
}

export namespace Forest {
  export type AsObject = {
    name: string,
    featuresMap: Array<[string, Feature.AsObject]>,
    treesMap: Array<[string, Tree.AsObject]>,
  }
}

export class Feature extends jspb.Message {
  hasId(): boolean;
  clearId(): void;
  getId(): Guid | undefined;
  setId(value?: Guid): void;

  getName(): string;
  setName(value: string): void;

  getAttributesMap(): jspb.Map<string, Attribute>;
  clearAttributesMap(): void;
  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  clearFlowsList(): void;
  getFlowsList(): Array<Flow>;
  setFlowsList(value: Array<Flow>): void;
  addFlows(value?: Flow, index?: number): Flow;

  hasEnvelope(): boolean;
  clearEnvelope(): void;
  getEnvelope(): Envelope | undefined;
  setEnvelope(value?: Envelope): void;

  hasSpace(): boolean;
  clearSpace(): void;
  getSpace(): Space | undefined;
  setSpace(value?: Space): void;

  hasRegion(): boolean;
  clearRegion(): void;
  getRegion(): Region | undefined;
  setRegion(value?: Region): void;

  hasPosition(): boolean;
  clearPosition(): void;
  getPosition(): Position | undefined;
  setPosition(value?: Position): void;

  hasPath(): boolean;
  clearPath(): void;
  getPath(): Path | undefined;
  setPath(value?: Path): void;

  hasGroup(): boolean;
  clearGroup(): void;
  getGroup(): Group | undefined;
  setGroup(value?: Group): void;

  getKindCase(): Feature.KindCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Feature.AsObject;
  static toObject(includeInstance: boolean, msg: Feature): Feature.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Feature, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Feature;
  static deserializeBinaryFromReader(message: Feature, reader: jspb.BinaryReader): Feature;
}

export namespace Feature {
  export type AsObject = {
    id?: Guid.AsObject,
    name: string,
    attributesMap: Array<[string, Attribute.AsObject]>,
    tagsList: Array<string>,
    flowsList: Array<Flow.AsObject>,
    envelope?: Envelope.AsObject,
    space?: Space.AsObject,
    region?: Region.AsObject,
    position?: Position.AsObject,
    path?: Path.AsObject,
    group?: Group.AsObject,
  }

  export enum KindCase {
    KIND_NOT_SET = 0,
    ENVELOPE = 101,
    SPACE = 102,
    REGION = 103,
    POSITION = 104,
    PATH = 105,
    GROUP = 106,
  }
}

export class Attribute extends jspb.Message {
  hasValue(): boolean;
  clearValue(): void;
  getValue(): google_protobuf_struct_pb.Value | undefined;
  setValue(value?: google_protobuf_struct_pb.Value): void;

  hasGraph(): boolean;
  clearGraph(): void;
  getGraph(): Graph | undefined;
  setGraph(value?: Graph): void;

  getKindCase(): Attribute.KindCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Attribute.AsObject;
  static toObject(includeInstance: boolean, msg: Attribute): Attribute.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Attribute, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Attribute;
  static deserializeBinaryFromReader(message: Attribute, reader: jspb.BinaryReader): Attribute;
}

export namespace Attribute {
  export type AsObject = {
    value?: google_protobuf_struct_pb.Value.AsObject,
    graph?: Graph.AsObject,
  }

  export enum KindCase {
    KIND_NOT_SET = 0,
    VALUE = 1,
    GRAPH = 2,
  }
}

export class Graph extends jspb.Message {
  clearVerticesList(): void;
  getVerticesList(): Array<Vertex>;
  setVerticesList(value: Array<Vertex>): void;
  addVertices(value?: Vertex, index?: number): Vertex;

  clearTagsList(): void;
  getTagsList(): Array<string>;
  setTagsList(value: Array<string>): void;
  addTags(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Graph.AsObject;
  static toObject(includeInstance: boolean, msg: Graph): Graph.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Graph, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Graph;
  static deserializeBinaryFromReader(message: Graph, reader: jspb.BinaryReader): Graph;
}

export namespace Graph {
  export type AsObject = {
    verticesList: Array<Vertex.AsObject>,
    tagsList: Array<string>,
  }
}

export class Vertex extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getExpression(): string;
  setExpression(value: string): void;

  clearValuesList(): void;
  getValuesList(): Array<string>;
  setValuesList(value: Array<string>): void;
  addValues(value: string, index?: number): string;

  clearDependantsList(): void;
  getDependantsList(): Array<string>;
  setDependantsList(value: Array<string>): void;
  addDependants(value: string, index?: number): string;

  getInitial(): number;
  setInitial(value: number): void;

  clearFormatsList(): void;
  getFormatsList(): Array<string>;
  setFormatsList(value: Array<string>): void;
  addFormats(value: string, index?: number): string;

  getDescription(): string;
  setDescription(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vertex.AsObject;
  static toObject(includeInstance: boolean, msg: Vertex): Vertex.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
  static serializeBinaryToWriter(message: Vertex, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Vertex;
  static deserializeBinaryFromReader(message: Vertex, reader: jspb.BinaryReader): Vertex;
}

export namespace Vertex {
  export type AsObject = {
    name: string,
    expression: string,
    valuesList: Array<string>,
    dependantsList: Array<string>,
    initial: number,
    formatsList: Array<string>,
    description: string,
  }
}

export interface UnitsMap {
  UNKNOWN: 0;
  DOLLARS: 1;
  JOULES: 2;
}

export const Units: UnitsMap;

