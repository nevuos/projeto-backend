import { IMeasureRepository } from '../repositories/IMeasureRepository';
import { ERROR_MESSAGES } from '../utils/constants/errorMessages';
import { MeasureNotFoundException } from '../utils/exceptions/MeasureNotFoundException';

export class ListMeasures {
    private measureRepository: IMeasureRepository;

    constructor(measureRepository: IMeasureRepository) {
        this.measureRepository = measureRepository;
    }

    async execute(customerCode: string, measureType?: string) {
        try {
            const measures = await this.measureRepository.findByCustomerCode(customerCode, measureType);

            if (measures.length === 0) {
                throw new MeasureNotFoundException(ERROR_MESSAGES.MEASURE_NOT_FOUND);
            }

            return {
                customer_code: customerCode,
                measures: measures.map(measure => ({
                    measure_uuid: measure.measure_uuid,
                    measure_datetime: measure.measure_datetime,
                    measure_type: measure.measure_type,
                    has_confirmed: measure.has_confirmed,
                    image_url: measure.image_url
                }))
            };
        } catch (error) {
            throw error;
        }
    }
}