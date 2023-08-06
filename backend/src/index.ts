process.on('uncaughtException', (error) => {
    console.log('🔴 UNCAUGHT EXCEPTION!');
    console.info(error);
    console.info('⚠ Server Closed!');
    process.exit(1);
});   

import app from "app";
import logger from "utils/logger";
import config from "utils/config";

app.listen(config.port, () => {
    logger.info(`🟢 Server Started at port ${config.port}`);
});

process.on('unhandledRejection', (error: Error) => {
    logger.error('🔴 UNHANDLED REJECTION!');
    logger.error(error);
    console.info('⚠ Server Closed!');
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.info('🟢 SIGTERM RECEIVED!');
    console.info('🟢 Server Closed!');
    process.exit(1);
});
