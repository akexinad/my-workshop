import { Node, Vertex } from "./types";

// dcccc4a6-e2d9-4543-973e-7d9358ad01df ROOT
// cd295c77-6b75-4498-894d-708e9674fb36 X
// a0cdeb4c-49c0-4fbe-abd5-8879d1e952b3 X
// aa7d4bf7-1edf-4ad6-abf5-8e5eec148ced X
// 4a899981-b129-401f-9811-2159ceea066c
// 1750f055-2a15-416d-aa5a-728295d31a2c
// cc69fed6-582f-4ff2-a6e7-fa1ebcaf172d
// 27bc3fa2-d5b8-4234-98c5-cb3075c38d5f
// b34f8c40-138f-439b-9297-493261c8a860
// 321fcd08-ea77-46f6-bbb1-55a0d991b17f
// 5ff0e88f-34c0-4807-a94f-b9113eb5d97c
// 55051e2b-a65b-4602-98c7-c8dfc2beae40
// 81642b16-ac5a-470c-9d41-63fbb202e18e
// f8b4243b-b918-405b-9bc5-2a9b73948dd4
// 96af9771-5c16-4269-a8f5-89bc62677a84
// ae09eb2b-4e4a-4f0c-b38c-fa4e5906c8ae
// 6ef1a7ec-4238-476d-9f8a-dd311beafff1
// 347d1912-b392-4c80-b5a2-4e6af1c0f9e9
// 9a79d07f-5eb8-4c12-8b0b-ef22518acdee
// 00f75c7c-18b2-4be3-a215-f19bb0166e98
// d0e398c8-b52c-4f8e-b342-6b251d58a186
// 98a26127-80c0-4c8a-b883-84deffbaa0aa
// a475e114-189a-448d-a664-74724fa1ee01
// 9f0efb2d-44bd-4586-a1a2-2a0ee85ee691
// b4e716db-3372-496c-8336-8ce6cd49327f
// 2e1dd41f-2dbd-444e-93c5-4c5752fd253e
// 3a5aa22a-d2f0-4ca3-b98b-788819d62a5e
// d9a3a753-b139-47d5-a0da-6039c24b2b0f
// 8af8495e-cfa0-4f9e-8f5d-3a1eba58741d
// fe2e74c4-5373-4841-b550-dfd3fc81d98f

const FOLLOWING = "following";

class Dag {
    root: Node;
    nodes: Node[] = [];
    vertices: Vertex[] = [];

    /**
     *
     */
    constructor(node: Node) {
        this.root = node;
        this.nodes.push(this.root);
    }

    private findCycle = (parentVertices: Vertex[], childVertex: Vertex) => {
        return parentVertices.find(
            (parentVertex) => parentVertex.to === childVertex.from
        );
    };

    addVertex = (vertices: Node["vertices"]) => {
        vertices.forEach((vertex) => {
            const { from, tag } = vertex;

            const parent = this.nodes.find((node) => node.id === vertex.to);

            if (!parent) {
                throw new Error("Error: No parent found!");
            }

            if (parent.id === vertex.from) {
                throw new Error("Error: Cannot point to itself!");
            }

            if (this.findCycle(parent.vertices, vertex)) {
                throw new Error(
                    "Error: Cycle Found! Graph can only go in one direction!"
                );
            }

            parent.vertices.push({
                to: "",
                from,
                tag,
            });

            this.vertices.push(vertex);
        });
    };

    addNode = (node: Node) => {
        if (!node) {
            throw new Error("Error: Where node?");
        }

        this.nodes.push(node);

        if (node.vertices.length) {
            this.addVertex(node.vertices);
        }
    };
}

const NODE_1_ID = "dcccc4a6-e2d9-4543-973e-7d9358ad01df";
const NODE_2_ID = "cd295c77-6b75-4498-894d-708e9674fb36";
const NODE_3_ID = "a0cdeb4c-49c0-4fbe-abd5-8879d1e952b3";
const NODE_4_ID = "aa7d4bf7-1edf-4ad6-abf5-8e5eec148ced";

const node: Node = {
    id: NODE_1_ID,
    data: {
        name: "fellini",
        age: 44,
        male: true,
    },
    vertices: [],
};

const node2: Node = {
    id: NODE_2_ID,
    data: {
        name: "pasolini",
        age: 33,
        male: true,
    },
    vertices: [
        {
            tag: FOLLOWING,
            to: NODE_1_ID,
            from: NODE_2_ID,
        },
    ],
};

const node3: Node = {
    id: NODE_3_ID,
    data: {
        name: "benigni",
        age: 55,
        male: true,
    },
    vertices: [
        {
            tag: FOLLOWING,
            to: NODE_2_ID,
            from: NODE_3_ID,
        },
        {
            tag: FOLLOWING,
            to: NODE_1_ID,
            from: NODE_3_ID,
        },
    ],
};

const node4 = {
    id: NODE_4_ID,
    data: {
        name: "cecilia",
        age: 60,
        male: false,
    },
    vertices: [
        {
            tag: FOLLOWING,
            to: NODE_1_ID,
            from: NODE_4_ID,
        },
        {
            tag: FOLLOWING,
            to: NODE_2_ID,
            from: NODE_4_ID,
        },
        {
            tag: FOLLOWING,
            to: NODE_3_ID,
            from: NODE_4_ID,
        },
    ],
};

const dag = new Dag(node);

dag.addNode(node2);
dag.addNode(node3);
dag.addNode(node4);

// dag.addVertex([
//     {
//         to: NODE_3_ID,
//         from: NODE_1_ID,
//         tag: FOLLOWING,
//     },
// ]);

console.log(`dag`, dag);
