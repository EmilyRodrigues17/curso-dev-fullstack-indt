import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5433,
    username: "postgres",
    password: "123",
    database: "mini_handson",
    entities: ["src/entity/*.ts"],
    logging: true,
    synchronize: true,
})
