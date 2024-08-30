import { Request, Response, NextFunction } from 'express';
import { errorMap } from '../constants/error-map';
import { ValidationError } from 'class-validator';
import { InvalidDataException } from '../exceptions/InvalidDataException';

export function errorHandler(err: Error | ValidationError[], req: Request, res: Response, next: NextFunction): Response {
    if (Array.isArray(err) && err.every(e => e instanceof ValidationError)) {
        const messages = err.flatMap((error: ValidationError) => 
            Object.values(error.constraints || [])
        ).join(', ');

        err = new InvalidDataException(messages);
    }

    const errorConfig = errorMap.get(err.constructor as Function);
    if (errorConfig) {
        return res.status(errorConfig.statusCode).json({
            error_code: errorConfig.errorCode,
            error_description: errorConfig.errorMessage
        });
    }

    return res.status(500).json({
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Ocorreu um erro inesperado.'
    });
}