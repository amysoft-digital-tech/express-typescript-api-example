import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'amysoft_pwabuilder',
    password: 'redliubawp_tfosyma',
    database: 'amysoft_pwabuilder',
    logging: false,
    synchronize: true,
    name: 'default',
    entities: [`./src/**/entities/*.entity.{js,ts}`],
    migrations: ['./src/db/migrations/**/*{.ts,.js}'],
    subscribers: ['subscriber/**/*{.ts,.js}']
});
