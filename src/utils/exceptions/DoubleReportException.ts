export class DoubleReportException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DoubleReportException';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}