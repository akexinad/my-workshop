type ILinkedListNode<T> = {
    value: T;
    next: ILinkedListNode<T> | null;
    // previous: ILinkedListNode<T> | null;
};

type IComparator<T> = (data: T) => boolean;

type ILinkedList<T> = {
    insertAtStart: (data: T) => ILinkedListNode<T>;
    insertAtEnd: (data: T) => ILinkedListNode<T>;
    delete: (node: ILinkedListNode<T>) => void;
    traverse: () => T[];
    size(): number;
    search: (comparator: IComparator<T>) => ILinkedListNode<T> | null;
};

export type INodeValue = {
    id: string;
    name: string;
};

class LinkedListNode implements ILinkedListNode<INodeValue> {
    public value: INodeValue;
    public next: ILinkedListNode<INodeValue> | null;

    constructor(node: INodeValue) {
        this.value = node;
        this.next = null;
    }
}

export class LinkedList {
    private head: ILinkedListNode<INodeValue>;
    private tail: ILinkedListNode<INodeValue>;
    public length: number = 0;

    constructor(value: INodeValue) {
        if (!value) {
            throw new Error("Must initialise with node");
        }

        const newNode = new LinkedListNode(value);

        this.head = newNode;
        this.tail = newNode;
        this.length++;
    }

    public append = (value: INodeValue) => {
        const newNode = new LinkedListNode(value);

        this.tail.next = newNode;
        this.tail = newNode;
        this.tail.next = null;
        this.length++;

        return this;
    };

    public prepend = (value: INodeValue) => {
        const newNode = new LinkedListNode(value);

        newNode.next = this.head;
        this.head = newNode;
        this.length++;

        return this;
    };

    public insert = (value: INodeValue, rawIndex: number) => {
        const index = rawIndex < 0 ? 0 : rawIndex;

        if (index === 0) {
            return this.prepend(value);
        }

        if (index >= this.length) {
            return this.append(value);
        }

        let count = 1;
        let currentNode: ILinkedListNode<INodeValue> | null = this.head;

        while (currentNode) {
            if (count === index) {
                const newNode = new LinkedListNode(value);

                newNode.next = currentNode.next;
                currentNode.next = newNode;

                break;
            }

            currentNode = currentNode.next;
            count++;
        }

        this.length++;
        return this;
    };

    public find = (comparator: IComparator<INodeValue>) => {
        let currentNode: ILinkedListNode<INodeValue> | null = this.head;

        while (currentNode) {
            if (comparator(currentNode.value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        console.error("Error: Linked list node not found.");
        return null;
    };

    public delete = (comparator: IComparator<INodeValue>) => {
        let currentNode: ILinkedListNode<INodeValue> | null = this.head;

        let count = 1;

        while (currentNode.next) {
            if (comparator(currentNode.next.value)) {
                currentNode.next = null;
                this.length -= count;
                return currentNode;
            }

            currentNode = currentNode.next;
            count++;
        }

        console.error("Error: Linked list node to delete not found.");
        return null;
    };

    public pop = () => {
        let currentNode: ILinkedListNode<INodeValue> = this.head;

        // console.log('currentNode', currentNode);

        while (currentNode.next) {
            if (currentNode.next.value.id === this.tail.value.id) {
                // console.log('this.tail', this.tail);
                // const oldTail = this.tail;
                this.tail = currentNode;
                this.length--;
                return this;
            }

            currentNode = currentNode.next;
        }

        return null;
    };

    public reverse = () => {
        let currentNode = this.head;
        let tempStoredNextNode = null;
        let previousNode = null;

        while (currentNode) {
            // store the next node
            tempStoredNextNode = currentNode.next;

            // reverse the pointer
            currentNode.next = previousNode;

            // step forward in the list
            previousNode = currentNode;
            currentNode = tempStoredNextNode as ILinkedListNode<INodeValue>;
        }

        this.tail = this.head;
        this.head = previousNode as ILinkedListNode<INodeValue>;

        return this;
    };
}
