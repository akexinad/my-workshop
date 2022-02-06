type Data = {
    name: string;
    age: number;
    male: boolean;
};

export type Vertex = {
    id: string;
    data: Data;
    edges: {}
};

export type Edge = {
    startVertex: Vertex;
    endVertex: Vertex;
    tag: string;
};

export type Edges = {
    [id: string]:
}