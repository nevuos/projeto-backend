import { Request, Response } from 'express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { GeminiService } from '../services/GeminiService';
import { MeasureRepository } from '../repositories/MeasureRepository';

import { UploadMeasureDTO } from '../dtos/request/UploadMeasureDTO';
import { ConfirmMeasureDTO } from '../dtos/request/ConfirmMeasureDTO';
import { UploadMeasureResponseDTO } from '../dtos/response/UploadMeasureResponseDTO';
import { ConfirmMeasureResponseDTO } from '../dtos/response/ConfirmMeasureResponseDTO';
import { ListMeasuresResponseDTO } from '../dtos/response/ListMeasuresResponseDTO';
import { UploadMeasure } from '../use-cases/UploadMeasure';
import { ConfirmMeasure } from '../use-cases/ConfirmMeasure';
import { ListMeasures } from '../use-cases/ListMeasures';
import { InvalidDataException } from '../utils/exceptions/InvalidDataException';

export class MeasureController {

    // POST /upload
    async uploadImage(req: Request, res: Response) {
        try {
            const dto = plainToClass(UploadMeasureDTO, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                throw new InvalidDataException('Dados inválidos fornecidos.');
            }

            const geminiService = new GeminiService();
            const measureRepository = new MeasureRepository();
            const uploadMeasure = new UploadMeasure(measureRepository, geminiService);

            const result = await uploadMeasure.execute(dto);

            const response = plainToClass(UploadMeasureResponseDTO, result);
            res.status(200).json(response);
        } catch (error) {
            res.status(this.getHttpStatus(error)).json({ error_code: error.name, error_description: error.message });
        }
    }

    // PATCH /confirm
    async confirmMeasure(req: Request, res: Response) {
        try {
            const dto = plainToClass(ConfirmMeasureDTO, req.body);
            const errors = await validate(dto);

            if (errors.length > 0) {
                throw new InvalidDataException('Dados inválidos fornecidos.');
            }

            const measureRepository = new MeasureRepository();
            const confirmMeasure = new ConfirmMeasure(measureRepository);

            const result = await confirmMeasure.execute(dto);

            const response = plainToClass(ConfirmMeasureResponseDTO, { success: true });
            res.status(200).json(response);
        } catch (error) {
            res.status(this.getHttpStatus(error)).json({ error_code: error.name, error_description: error.message });
        }
    }

    // GET /<customer_code>/list
    async listMeasures(req: Request, res: Response) {
        try {
            const measureRepository = new MeasureRepository();
            const listMeasures = new ListMeasures(measureRepository);

            const result = await listMeasures.execute(req.params.customer_code, req.query.measure_type as string);

            const response = plainToClass(ListMeasuresResponseDTO, {
                customer_code: req.params.customer_code,
                measures: result
            });

            res.status(200).json(response);
        } catch (error) {
            res.status(this.getHttpStatus(error)).json({ error_code: error.name, error_description: error.message });
        }
    }

    private getHttpStatus(error: Error): number {
        switch (error.name) {
            case 'InvalidDataException':
                return 400;
            case 'NoMeasuresFoundException':
                return 404;
            case 'DoubleReportException':
            case 'ConfirmationDuplicateException':
                return 409;
            default:
                return 500;
        }
    }
}