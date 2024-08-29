import "reflect-metadata"
import { DataSource } from "typeorm"
import { Measure } from "../entities/Measure"
import { Customer } from "../entities/Customer"


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "478p2279",
    database: "projeto_backend",
    synchronize: true,
    logging: false,
    entities: [Customer, Measure],
    migrations: [],
    subscribers: [],
})
