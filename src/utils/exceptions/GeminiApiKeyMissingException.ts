export class GeminiApiKeyMissingException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'GeminiApiKeyMissingException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}