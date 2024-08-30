export class MeasureNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MeasureNotFoundException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}