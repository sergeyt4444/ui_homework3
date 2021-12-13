export class Tree<V> {
    public size: number;
    public root: TreeNode<V> | null;

    constructor() {
        this.size = 0;
        this.root = null;
    }

    public simplePrint() {
        console.log(this.simplePrintNode(this.root));
    }

    private simplePrintNode(node: TreeNode<V> | null) : string {
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

    public add(key: number, value: V) : void {
        if (this.root == null) {
            this.root = new TreeNode<V>(key, value, null, null);
            this.size++;
        }
        else {
            this.root = this.addNode(key, value, this.root);
        }
    }

    private addNode(key: number, value: V, node: TreeNode<V> | null) : TreeNode<V> {
        if (node == null || node.key === undefined) {
            this.size++;
            return new TreeNode<V>(key, value, null,null);
        }
        if (key < node.key) {
            node.left = this.addNode(key, value, node.left);
        }
        else {
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

    public get(key: number): V | undefined
    {
        if (this.root == null) {
            console.log("No such element");
            return undefined;
        } else {
            return this.getNode(key, this.root);
        }
    }

    private getNode(key: number, node: TreeNode<V> | null): V | undefined{
        if (node == null || node.key === undefined) {
            console.log("No such element");
            return undefined;
        }
        if (key < node.key) {
            return this.getNode(key, node.left);
        } else {
            if (key > node.key) {
                return this.getNode(key, node.right);
            } else {
                if (node.value == undefined) {
                    console.log("No such element");
                    return undefined;
                }
                return node.value;
            }
        }
    }

    public remove(key: number): void {
        this.root = this.removeNode(key, this.root);
    }

    private removeNode(key: number | undefined, node: TreeNode<V> | null): TreeNode<V> | null {
        if (node == null || key === undefined || node.key === undefined) {
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
                        let closestLeaf: TreeNode<V>;
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

    private findClosestLeaf(node: TreeNode<V>): TreeNode<V> {
        return node.left == null ? node : this.findClosestLeaf(node.left);
    }
}

class TreeNode<V> {
    constructor(public key: number|undefined, public value: V|undefined, public left: TreeNode<V> | null, public right: TreeNode<V> | null) {}
}


