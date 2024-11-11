import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: process.env.AMYSOFT_PWABUILDER_POSTGRES_HOST,
    port: process.env.AMYSOFT_PWABUILDER_POSTGRES_PORT,
    username: process.env.AMYSOFT_PWABUILDER_POSTGRES_USER,
    password: process.env.AMYSOFT_PWABUILDER_POSTGRES_PASSWORD,
    database: process.env.AMYSOFT_PWABUILDER_POSTGRES_DATABASE,
    logging: false,
    synchronize: true,
    name: 'default',
    entities: [`./src/**/entities/*.entity.{js,ts}`],
    migrations: ['./src/db/migrations/**/*{.ts,.js}'],
    subscribers: ['subscriber/**/*{.ts,.js}']
});
