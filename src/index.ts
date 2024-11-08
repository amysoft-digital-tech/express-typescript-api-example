/*import dotenv from 'dotenv';
if(process.env.AMYSOFT_PROJECT_ONE_NODE_ENV !== 'PROD') {
dotenv.config({ path: `${__dirname}/../.env` });
}
*/
import logger from './logger';
import dbh from './db/db';
import app from './app';

if(process.env.AMYSOFT_PROJECT_ONE_NODE_ENV !== 'PROD') {
    logger.info(`environment is DEVELOPMENT. dotenv vars loaded.`);
    } else {
        logger.info(`environment is PRODUCTION. local enviroment vars loaded.`);
    }


async function assertDatabaseConnectionOk() {
    logger.info('Checking database connection');

    try {
        await dbh.AppDataSource.initialize();
        logger.info('DB connection OK');
    } catch(error) {
        logger.info('Unable to connect to database');
        logger.info(`Error: ${(error as Error).name} - ${(error as Error).message}`);
        logger.info(`Error Stack: ${(error as Error).stack}`);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();

    app.listen(process.env.AMYSOFT_PWABUILDER_PORT, () => {
        logger.info(`server started on port ${process.env.AMYSOFT_PWABUILDER_PORT}`);
    });
}

init();