import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import { hrService } from '../services';
import config from '../utils/config';
const jwt = require('jsonwebtoken');


const newhr = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;
    const body = req.body;

    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    body.password = passwordHash;

    const newhr = await hrService.createNewhr(body);

    res.status(201).json({
        'success': true,
        'msg': 'New hr created',
        'data': newhr
    });

});


const gethr = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const hrId = req.user.id;

    const hr = await hrService.gethr(hrId);

    res.status(200).json({
        'success': true,
        'msg': 'hr found',
        'data': hr
    });

});

const getAllhrs = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allhrs = await hrService.getAllhrs();

    res.status(200).json({
        'success': true,
        'msg': 'All hrs',
        'data': allhrs
    });
});


const loginhr = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const hr = await hrService.loginhr(body.email, body.password);

    const token = await jwt.sign(hr, config.jwtToken, {expiresIn: '1h'});
    res.status(200).json({
        'success': true,
        'msg': 'Login successful',
        'token': token
    });

});

export default {
    newhr,
    getAllhrs,
    loginhr,
    gethr
}