process.on('uncaughtException', (error) => {
    console.log('🔴 UNCAUGHT EXCEPTION!');
    console.info(error);
    console.info('⚠ Server Closed!');
    process.exit(1);
});   

import app from "app";
import logger from "utils/logger";

const port = process.env.PORT || 5000;

app.listen(port, () => {
    logger.info(`🟢 Server Started at port ${port}`);
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
