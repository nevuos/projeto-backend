import { Request, Response, NextFunction } from 'express';
import { UploadMeasure } from '../use-cases/UploadMeasure';
import { ConfirmMeasure } from '../use-cases/ConfirmMeasure';
import { ListMeasures } from '../use-cases/ListMeasures';
import { GeminiService } from '../services/GeminiService';
import { MeasureRepository } from '../repositories/MeasureRepository';
import { UploadMeasureResponseDTO } from '../dtos/response/UploadMeasureResponseDTO';
import { ConfirmMeasureResponseDTO } from '../dtos/response/ConfirmMeasureResponseDTO';
import { ListMeasuresResponseDTO } from '../dtos/response/ListMeasuresResponseDTO';
import { plainToInstance } from 'class-transformer';

export class MeasureController {

    async uploadImage(req: Request, res: Response, next: NextFunction) {
        try {
            const geminiService = new GeminiService();
            const measureRepository = new MeasureRepository();
            const uploadMeasure = new UploadMeasure(measureRepository, geminiService);

            const result = await uploadMeasure.execute(req.body);

            const response = plainToInstance(UploadMeasureResponseDTO, result);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async confirmMeasure(req: Request, res: Response, next: NextFunction) {
        try {
            const measureRepository = new MeasureRepository();
            const confirmMeasure = new ConfirmMeasure(measureRepository);

            const result = await confirmMeasure.execute(req.body);

            const response = plainToInstance(ConfirmMeasureResponseDTO, { success: true });
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    async listMeasures(req: Request, res: Response, next: NextFunction) {
        try {
            const measureRepository = new MeasureRepository();
            const listMeasures = new ListMeasures(measureRepository);

            const result = await listMeasures.execute(req.params.customer_code, req.query.measure_type as string);

            const response = plainToInstance(ListMeasuresResponseDTO, {
                customer_code: req.params.customer_code,
                measures: result
            });

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }
}