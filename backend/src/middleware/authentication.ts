const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import config from "../utils/config";
import AppError from "../utils/AppError";

const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    try {

        let token = req.header('Authorization');

        if(! token) {  
            next(new AppError('Jwt Token Missing', 401));
        }

        token = token?.split(' ')[1];

        // @ts-ignore
        req.user = await jwt.verify(token, config.jwtToken);

        next();

    } catch (error) {
        logger.error(error);
        next(new AppError('Unauthorized', 401));
    }

};

export default authenticate;