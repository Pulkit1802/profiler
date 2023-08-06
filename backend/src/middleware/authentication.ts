const jwt = require('jsonwebtoken');
import { NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import config from "utils/config";

const authenticate = (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.header('Authorization');

        if(! token) {  
            return res.status(401).send({
                status: 'fail',
                message: 'Unauthorized'
            });
        }

        // @ts-ignore
        req.user = jwt.verify(token, config.jwtToken);

        next();

    } catch (error) {
        logger.error(error);
        res.status(401).send({
            status: 'fail',
            message: 'Unauthorized'
        });
    }

};

export default authenticate;