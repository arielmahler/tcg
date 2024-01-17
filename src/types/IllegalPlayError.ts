export const FULL_CHARACTER = 'Character is full';
export const ILLEGAL_CHARACTER = 'Character cannot be targeted';

export default class IllegalPlayError extends Error {
    public message: string;

    public constructor(message: string = '') {
        super(message);
        this.message = message;
    }
}