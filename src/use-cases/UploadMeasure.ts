import { IMeasureRepository } from '../repositories/IMeasureRepository';
import { Measure } from '../entities/Measure';
import { GeminiService } from '../services/GeminiService';
import { DoubleReportException } from '../utils/exceptions/DoubleReportException';
import { ERROR_MESSAGES } from '../utils/constants/errorMessages';

export class UploadMeasure {
    private measureRepository: IMeasureRepository;
    private geminiService: GeminiService;

    constructor(measureRepository: IMeasureRepository, geminiService: GeminiService) {
        this.measureRepository = measureRepository;
        this.geminiService = geminiService;
    }

    async execute(inputData: any) {
        try {
            const existingMeasures = await this.measureRepository.findByCustomerCode(
                inputData.customer_code,
                inputData.measure_type
            );

            if (existingMeasures.length > 0) {
                throw new DoubleReportException(ERROR_MESSAGES.DOUBLE_REPORT);
            }

            const measureData = await this.geminiService.getMeasurementFromImage(inputData.image);

            const newMeasure = new Measure();
            newMeasure.customer_code = inputData.customer_code;
            newMeasure.measure_type = inputData.measure_type;
            newMeasure.measure_datetime = inputData.measure_datetime;
            newMeasure.measure_value = measureData.measure_value;
            newMeasure.image_url = measureData.image_url;
            newMeasure.has_confirmed = false;

            const savedMeasure = await this.measureRepository.save(newMeasure);

            return {
                measure_uuid: savedMeasure.measure_uuid,
                image_url: savedMeasure.image_url,
                measure_value: savedMeasure.measure_value
            };
        } catch (error) {
            throw error;
        }
    }
}