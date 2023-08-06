process.on('uncaughtException', (error) => {
    console.log('🔴 UNCAUGHT EXCEPTION!');
    console.info(error);
    console.info('⚠ Server Closed!');
    process.exit(1);
});   

import app from "app";

app.listen(5000, () => {
    console.log('🟢 Server Started!');
    console.log('🟢 Listening on port 5000!');
});

process.on('unhandledRejection', (error: Error) => {
    console.log('🔴 UNHANDLED REJECTION!');
    console.info(error);
    console.info('⚠ Server Closed!');
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('🟢 SIGTERM RECEIVED!');
    console.log('🟢 Server Closed!');
    process.exit(1);
});
