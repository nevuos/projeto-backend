import { Request, Response, NextFunction } from 'express';
import { errorMap } from './errorMap';


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    const errorConfig = errorMap.get(err.constructor as Function);

    if (errorConfig) {
        return res.status(errorConfig.statusCode).json({ error_code: errorConfig.errorCode, error_description: errorConfig.errorMessage });
    }

    return res.status(500).json({ error_code: 'INTERNAL_SERVER_ERROR', error_description: 'Ocorreu um erro inesperado.' });
}