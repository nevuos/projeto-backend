import { InvalidDataException } from '../exceptions/InvalidDataException';
import { MeasureNotFoundException } from '../exceptions/MeasureNotFoundException';
import { ConfirmationDuplicateException } from '../exceptions/ConfirmationDuplicateException';
import { DoubleReportException } from '../exceptions/DoubleReportException';
import { ERROR_CODES } from '../constants/errorCodes';
import { ERROR_MESSAGES } from '../constants/errorMessages';

export const errorMap = new Map<Function, { statusCode: number; errorCode: string; errorMessage: string }>([
    [InvalidDataException, { statusCode: 400, errorCode: ERROR_CODES.INVALID_DATA, errorMessage: ERROR_MESSAGES.INVALID_DATA }],
    [MeasureNotFoundException, { statusCode: 404, errorCode: ERROR_CODES.MEASURE_NOT_FOUND, errorMessage: ERROR_MESSAGES.MEASURE_NOT_FOUND }],
    [ConfirmationDuplicateException, { statusCode: 409, errorCode: ERROR_CODES.CONFIRMATION_DUPLICATE, errorMessage: ERROR_MESSAGES.CONFIRMATION_DUPLICATE }],
    [DoubleReportException, { statusCode: 409, errorCode: ERROR_CODES.DOUBLE_REPORT, errorMessage: ERROR_MESSAGES.DOUBLE_REPORT }],
]);