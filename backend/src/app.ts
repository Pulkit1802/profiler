import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const app : Application = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(morgan('dev'));

app.get('/api/healthCheck', (req, res) => {
    try {
        const healthCheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        }

        res.status(200).json(healthCheck);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use(cors(corsOptions));
app.use(express.json());

export default app;