import { Tree } from "./tree.js";
import * as readlineSync from "readline-sync"


let tree: Tree<number, number>;
tree = new Tree<number, number>();
helpMessage();
acceptCommand();

function helpMessage(): void {
    console.log("This message will explain how to use this application");
    console.log("If you want to insert an element into the thee, write '1' in console.");
    console.log("If you want to remove an element from the tree, write '2' in console.");
    console.log("If you want to read a value of a certain tree node, write '3' in console.");
    console.log("If you want to print the entire tree, write '4' in console");
    console.log("If you want to exit, write '5' in console");
    console.log("To print this message again write '0' in console");
}

function acceptCommand(): void {
    let req: string = readlineSync.question("Please write a number: ");
    switch (req) {
        case "0": {
            helpMessage();
            acceptCommand();
            break;
        }
        case "1": {
            let key: string = readlineSync.question("Write new element's key: ");
            let value: string = readlineSync.question("Write new element's value: ");
            tree.add(Number(key),Number(value));
            acceptCommand();
            break;
        }
        case "2": {
            let key: string = readlineSync.question("Write element's key: ");
            tree.remove(Number(key));
            acceptCommand();
            break;
        }
        case "3": {
            let key: string = readlineSync.question("Write element's key: ");
            console.log(tree.get(Number(key)));
            acceptCommand();
            break;
        }
        case "4": {
            tree.simplePrint();
            acceptCommand();
            break;
        }
        case "5": {
            break;
        }
        default: {
            console.log("Invalid input");
            acceptCommand();
        }
    }
}