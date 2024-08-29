import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { InvalidDataException } from '../exceptions/InvalidDataException';

export function validationMiddleware<T>(type: any): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);
        validate(dto).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const errorMessages = errors.map(error => Object.values(error.constraints || {}).join(', ')).join('; ');
                next(new InvalidDataException(errorMessages));
            } else {
                next();
            }
        });
    };
}