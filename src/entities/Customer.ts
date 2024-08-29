import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryColumn()
    customer_code: string;

    @Column({ type: "varchar" })
    nome_cliente: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}