import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const catchAsync = (fn: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next)
        .catch((err: any) => next(err))
    };
};

export default catchAsync;