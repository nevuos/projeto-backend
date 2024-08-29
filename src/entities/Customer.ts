import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Measure } from "./Measure";

@Entity()
export class Customer {
    @PrimaryColumn()
    customer_code: string;

    @Column({ type: "varchar" })
    nome_cliente: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @OneToMany(() => Measure, measure => measure.customer)
    measures: Measure[];
}