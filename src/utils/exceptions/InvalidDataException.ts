export class InvalidDataException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidDataException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}