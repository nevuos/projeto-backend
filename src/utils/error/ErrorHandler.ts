import { Request, Response, NextFunction } from 'express';
import { InvalidDataException } from '../exceptions/InvalidDataException';
import { MeasureNotFoundException } from '../exceptions/MeasureNotFoundException';
import { ConfirmationDuplicateException } from '../exceptions/ConfirmationDuplicateException';
import { DoubleReportException } from '../exceptions/DoubleReportException';
import { ERROR_CODES } from '../constants/errorCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof InvalidDataException) {
        return res.status(400).json({ error_code: ERROR_CODES.INVALID_DATA, error_description: ERROR_MESSAGES.INVALID_DATA });
    }
    if (err instanceof MeasureNotFoundException) {
        return res.status(404).json({ error_code: ERROR_CODES.MEASURE_NOT_FOUND, error_description: ERROR_MESSAGES.MEASURE_NOT_FOUND });
    }
    if (err instanceof ConfirmationDuplicateException) {
        return res.status(409).json({ error_code: ERROR_CODES.CONFIRMATION_DUPLICATE, error_description: ERROR_MESSAGES.CONFIRMATION_DUPLICATE });
    }
    if (err instanceof DoubleReportException) {
        return res.status(409).json({ error_code: ERROR_CODES.DOUBLE_REPORT, error_description: ERROR_MESSAGES.DOUBLE_REPORT });
    }

    return res.status(500).json({ error_code: ERROR_CODES.INTERNAL_SERVER_ERROR, error_description: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
}