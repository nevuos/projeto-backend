import { IMeasureRepository } from '../repositories/IMeasureRepository';
import { Measure } from '../entities/Measure';
import { GeminiService } from '../services/GeminiService';
import { DoubleReportException } from '../utils/exceptions/DoubleReportException';
import { ERROR_MESSAGES } from '../utils/constants/error-messages';

export class UploadMeasure {
    private measureRepository: IMeasureRepository;
    private geminiService: GeminiService;

    constructor(measureRepository: IMeasureRepository, geminiService: GeminiService) {
        this.measureRepository = measureRepository;
        this.geminiService = geminiService;
    }

    async execute(inputData: any) {
        const existingMeasures = await this.measureRepository.findByCustomerCode(
            inputData.customer_code,
            inputData.measure_type
        );

        const currentMonth = new Date(inputData.measure_datetime).getMonth();
        const currentYear = new Date(inputData.measure_datetime).getFullYear();

        const duplicate = existingMeasures.some(measure => {
            const measureMonth = new Date(measure.measure_datetime).getMonth();
            const measureYear = new Date(measure.measure_datetime).getFullYear();
            return measureMonth === currentMonth && measureYear === currentYear;
        });

        if (duplicate) {
            throw new DoubleReportException(ERROR_MESSAGES.DOUBLE_REPORT);
        }

        const measureData = await this.geminiService.getMeasurementFromImage(inputData.image, inputData.customer_code);

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
    }
}