export class InvalidDataException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'InvalidDataException';
    }
}