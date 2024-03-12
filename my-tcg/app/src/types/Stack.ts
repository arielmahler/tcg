import OverflowError, { STACK_OVERFLOW } from "./OverflowError";
import { IStack } from "./tcgTypes";

/**
 * Class representing a generic Stack data type.
 */
export class Stack<T> implements IStack<T> {
    
    constructor(private _capacity: number = Infinity, private _storage: T[] = []) {}

    push(item: T): void {
        if (this.size() === this._capacity) {
            throw new OverflowError(STACK_OVERFLOW);
        }
        this._storage.push(item);
    }
    pop(): T | undefined {
        return this._storage.pop();
    }

    peek(): T | undefined {
        return this._storage[this.size() - 1];
    }

    size(): number {
        return this._storage.length;
    }
    
}