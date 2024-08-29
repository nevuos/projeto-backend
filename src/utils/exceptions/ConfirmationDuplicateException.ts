export class ConfirmationDuplicateException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConfirmationDuplicateException';
    }
}