export class InvalidTypeException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidTypeException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}