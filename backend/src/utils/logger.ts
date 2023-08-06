import winston from 'winston';

const logger = winston.createLogger({
levels: {
error: 0,
warn: 1,
info: 2,
http: 3,
verbose: 4,
debug: 5,
silly: 6,
},

transports: [
    new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
        winston.format.colorize({
            level: true,
        }),
        winston.format.simple()
        ),
    }),

    new winston.transports.File({
        filename: './logs/error.log',
        level: 'info',
        format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
        ),}),
    ],
});

export default logger;
