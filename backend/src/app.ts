import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import logger from 'utils/logger';
import config from 'utils/config';

const app : Application = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

if (config.nodeEnv === 'development')
    app.use(morgan('dev'));
else
    app.use(morgan('prod'));

app.get('/api/healthCheck', (req, res) => {
    try {
        const healthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        }

        res.status(200).json(healthCheck);

    } catch (error) {
        logger.error('🔴 Error on health check \n Error:', error );
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use(cors(corsOptions));
app.use(express.json());

export default app;