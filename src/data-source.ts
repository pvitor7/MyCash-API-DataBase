import {DataSource} from 'typeorm';
import "dotenv/config";

const AppDataSource = process.env.NODE_ENV === 'test' ?
    new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.ts"],
        synchronize: true
    }) 
    :
    new DataSource({
        type: "postgres",
        host: process.env.DB_HOST || "db",
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: false,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"],
    });

export default AppDataSource;