import { MeasureNotFoundException } from '../exceptions/MeasureNotFoundException';
import { ConfirmationDuplicateException } from '../exceptions/ConfirmationDuplicateException';
import { DoubleReportException } from '../exceptions/DoubleReportException';
import { GeminiApiKeyMissingException } from '../exceptions/GeminiApiKeyMissingException';
import { GeminiApiErrorException } from '../exceptions/GeminiApiErrorException';
import { InvalidTypeException } from '../exceptions/InvalidTypeException';
import { ERROR_CODES } from './error-codes';
import { ERROR_MESSAGES } from './error-messages';
import { BadRequestError } from 'routing-controllers';

export const errorMap = new Map<Function, { statusCode: number; errorCode: string; errorMessage: string }>([
    [BadRequestError, { statusCode: 400, errorCode: ERROR_CODES.INVALID_DATA, errorMessage: ERROR_MESSAGES.INVALID_DATA }],
    [MeasureNotFoundException, { statusCode: 404, errorCode: ERROR_CODES.MEASURE_NOT_FOUND, errorMessage: ERROR_MESSAGES.MEASURE_NOT_FOUND }],
    [ConfirmationDuplicateException, { statusCode: 409, errorCode: ERROR_CODES.CONFIRMATION_DUPLICATE, errorMessage: ERROR_MESSAGES.CONFIRMATION_DUPLICATE }],
    [DoubleReportException, { statusCode: 409, errorCode: ERROR_CODES.DOUBLE_REPORT, errorMessage: ERROR_MESSAGES.DOUBLE_REPORT }],
    [GeminiApiKeyMissingException, { statusCode: 500, errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR, errorMessage: ERROR_MESSAGES.GEMINI_API_KEY_MISSING }],
    [GeminiApiErrorException, { statusCode: 500, errorCode: ERROR_CODES.INTERNAL_SERVER_ERROR, errorMessage: ERROR_MESSAGES.GEMINI_API_ERROR }],
    [InvalidTypeException, { statusCode: 400, errorCode: ERROR_CODES.INVALID_TYPE, errorMessage: ERROR_MESSAGES.INVALID_TYPE }]
]);
