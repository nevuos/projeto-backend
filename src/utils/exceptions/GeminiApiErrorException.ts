export class GeminiApiErrorException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GeminiApiErrorException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}