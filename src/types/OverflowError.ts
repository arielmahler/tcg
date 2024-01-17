export const STACK_OVERFLOW = 'Stack is at capacity';
export const STACK_EMPTY = 'Stack is empty';

export default class OverflowError extends Error {
    public message: string;

    public constructor(message: string = '') {
        super(message);
        this.message = message;
    }
}