import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Customer } from "./Customer";

@Entity()
export class Measure {
    @PrimaryGeneratedColumn("uuid")
    measure_uuid: string;

    @Column({ type: 'timestamp' })
    measure_datetime: Date;

    @Column({ type: 'varchar', length: 10 })
    measure_type: string;

    @Column({ type: 'int' })
    measure_value: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image_url: string;

    @Column({ type: 'boolean', default: false })
    has_confirmed: boolean;

    @Column({ type: 'varchar', length: 255 })
    customer_code: string;

    @ManyToOne(() => Customer, customer => customer.measures)
    @JoinColumn({ name: "customer_code", referencedColumnName: "customer_code" })
    customer: Customer;
}