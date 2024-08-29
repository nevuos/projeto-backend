import { Measure } from "../entities/Measure";

export interface IMeasureRepository {
    save(measure: Measure): Promise<Measure>;
    findByCustomerCode(customerCode: string, measureType?: string): Promise<Measure[]>;
    findById(measureUUID: string): Promise<Measure | null>;
    update(measure: Measure): Promise<void>;
}