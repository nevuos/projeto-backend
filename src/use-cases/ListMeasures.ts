import { IMeasureRepository } from '../repositories/IMeasureRepository';
import { ERROR_MESSAGES } from '../utils/constants/error-messages';
import { MeasureNotFoundException } from '../utils/exceptions/MeasureNotFoundException';
import { InvalidTypeException } from '../utils/exceptions/InvalidTypeException';

export class ListMeasures {
    private measureRepository: IMeasureRepository;

    constructor(measureRepository: IMeasureRepository) {
        this.measureRepository = measureRepository;
    }

    async execute(customerCode: string, measureType?: string) {
        if (measureType && !['WATER', 'GAS'].includes(measureType.toUpperCase())) {
            throw new InvalidTypeException(ERROR_MESSAGES.INVALID_TYPE);
        }

        const normalizedMeasureType = measureType ? measureType.toUpperCase() : undefined;

        const measures = await this.measureRepository.findByCustomerCode(customerCode, normalizedMeasureType);

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
    }
}