import { generateUUID } from "./utils/generateUUID";
import { INodeValue, LinkedList } from "./utils/LinkedList";

console.clear();

const node0: INodeValue = {
    id: generateUUID(),
    name: "turiano",
};

const linkedList = new LinkedList(node0);

const node1: INodeValue = {
    id: generateUUID(),
    name: "fellini",
};

const node2: INodeValue = {
    id: generateUUID(),
    name: "pasolini",
};

const node3: INodeValue = {
    id: generateUUID(),
    name: "benigni",
};

const node4: INodeValue = {
    id: generateUUID(),
    name: "foobar",
};

const node5: INodeValue = {
    id: generateUUID(),
    name: "13h4f813qghf3",
};

linkedList.append(node1);
linkedList.append(node2);
linkedList.append(node3);
linkedList.append(node4);
linkedList.append(node5);
// linkedList.insert(node5, 3);
// linkedList.prepend(node5);

const found = linkedList.find(({ name }) => name === "foobar");
console.log("found", found);

// const deleted = linkedList.delete(({name}) => name === "pasolini")
// console.log('deleted', deleted);

// const popped = linkedList.pop();
// console.log("popped", popped);

linkedList.reverse();

console.log("linkedList", linkedList);
