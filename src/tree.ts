export class Tree<K,V> {
    public size: number;
    public root: TreeNode<K,V> | null;

    constructor() {
        this.size = 0;
        this.root = null;
    }

    public simplePrint() {
        console.log(this.simplePrintNode(this.root));
    }

    private simplePrintNode(node: TreeNode<K,V> | null) : string {
        if (node != null) {
            // this.simplePrintNode(node.left);
            // console.log(node.value);
            // this.simplePrintNode(node.right);
            let leftStr, midStr, rightStr: string;
            leftStr = this.simplePrintNode(node.left);
            rightStr = this.simplePrintNode(node.right);
            midStr = String(node.value) + " ";
            if (node.value === undefined) {
                midStr = "";
            }
            return leftStr + midStr + rightStr;
        }
        else {
            return "";
        }

    }

    public add(key: K, value: V) : void {
        if (this.root == null) {
            this.root = new TreeNode<K,V>(key, value, null, null);
            this.size++;
        }
        else {
            this.root = this.addNode(key, value, this.root);
        }
    }

    private addNode(key: K, value: V, node: TreeNode<K, V> | null) : TreeNode<K,V> {
        if (node == null) {
            return new TreeNode<K, V>(key, value, null,null);
            this.size++;
        }
        // @ts-ignore
        if (key < node.key) {
            node.left = this.addNode(key, value, node.left);
        }
        else {
            // @ts-ignore
            if (key > node.key) {
                node.right = this.addNode(key, value, node.right);
            }
            else {
                if (key == node.key) {
                    console.log("Duplicate element");
                }
                return node;
            }
        }
        return node;
    }

    public get(key: K): V | undefined
    {
        if (this.root == null) {
            console.log("No such element");
            return undefined;
        } else {
            return this.getNode(key, this.root);
        }
    }

    private getNode(key: K, node: TreeNode<K, V> | null): V | undefined{
        if (node == null) {
            console.log("No such element");
            return undefined;
        }
        // @ts-ignore
        if (key < node.key) {
            return this.getNode(key, node.left);
        } else {
            // @ts-ignore
            if (key > node.key) {
                return this.getNode(key, node.right);
            } else {
                if (node.value == undefined) {
                    console.log("No such element");
                }
                return node.value;
            }
        }
    }

    public remove(key: K): void {
        this.root = this.removeNode(key, this.root);
    }

    private removeNode(key: K | undefined, node: TreeNode<K, V> | null): TreeNode<K, V> | null {
        if (node == null) {
            return null;
        }
        if (node.key == key) {
            if (node.left == null && node.right == null) {
                this.size--;
                node.key = undefined;
                node.value = undefined;
                return null;
            } else {
                if (node.left == null) {
                    this.size--;
                    node.key = undefined;
                    node.value = undefined;
                    return node.right;
                }
                else {
                    if (node.right == null) {
                        this.size--;
                        node.key = undefined;
                        node.value = undefined;
                        return node.left;
                    } else {
                        let closestLeaf: TreeNode<K, V>;
                        closestLeaf = this.findClosestLeaf(node.right);
                        node.value = closestLeaf.value;
                        node.key = closestLeaf.key;
                        node.right = this.removeNode(node.key, node.right);
                        return node;
                    }
                }
            }
        }
        else {
            // @ts-ignore
            if (node.key > key) {
                node.left = this.removeNode(key, node.left);
                return node;
            }
            else {
                node.right = this.removeNode(key, node.right);
                return node;
            }
        }
    }

    private findClosestLeaf(node: TreeNode<K, V>): TreeNode<K, V> {
        return node.left == null ? node : this.findClosestLeaf(node.left);
    }
}

class TreeNode<K,V> {
    constructor(public key: K|undefined, public value: V|undefined, public left: TreeNode<K, V> | null, public right: TreeNode<K, V> | null) {}
}


