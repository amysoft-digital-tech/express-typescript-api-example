import { DataSource } from "typeorm";
import * as entities from "./entities";

const AppDataSource = new DataSource({
    type: "postgres",
    host:process.env.AMYSOFT_PWABUILDER_POSTGRES_HOST,
    port:process.env.AMYSOFT_PWABUILDER_POSTGRES_PORT ? parseInt(process.env.AMYSOFT_PWABUILDER_POSTGRES_PORT) : 5432,
    username:process.env.AMYSOFT_PWABUILDER_POSTGRES_USER,
    password:process.env.AMYSOFT_PWABUILDER_POSTGRES_PASSWORD,
    database:process.env.AMYSOFT_PWABUILDER_POSTGRES_DATABASE,
    entities: Object.values(entities),
    migrations: ['./migrations/*.{js,ts}'],
    logging:process.env.AMYSOFT_PWABUILDER_POSTGRES_LOGGING == "false",
    synchronize:process.env.AMYSOFT_PWABUILDER_POSTGRES_SYNCRONIZE == "false",
    migrationsRun:process.env.AMYSOFT_PWABUILDER_POSTGRES_RUN_MIGRATIONS == "true"
});

export default {
    AppDataSource
}