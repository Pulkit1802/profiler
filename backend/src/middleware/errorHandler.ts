import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    err.code = err.code || 500;
    err.success = err.success;

    if (process.env.NODE_ENV === 'development') {
        logger.error(`message: ${err.message}, \n ${err.stack}`);
    } else if (process.env.NODE_ENV === 'production') {
        logger.error(`message: ${err.message}, \n ${err.statusCode}`);
    }

    console.log(err.message);

    res.status(err.code).json({
        success: err.success,
        message: err.message
    })
};

export default errorHandler;
