import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import userService from '../services/user.service';
import config from '../utils/config';
const jwt = require('jsonwebtoken');


const newUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;
    const body = req.body;

    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    body.password = passwordHash;

    const newUser = await userService.createNewUser(body);

    res.status(201).json({
        'success': true,
        'msg': 'New user created',
        'data': newUser
    });

});


const getUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = req.user.id;

    const user = await userService.getUser(userId);

    res.status(200).json({
        'success': true,
        'msg': 'User found',
        'data': user
    });

});

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await userService.getAllUsers();

    res.status(200).json({
        'success': true,
        'msg': 'All users',
        'data': allUsers
    });
});


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const user = await userService.loginUser(body.email, body.password);

    const token = await jwt.sign(user, config.jwtToken, {expiresIn: '1h'});
    res.status(200).json({
        'success': true,
        'msg': 'Login successful',
        'token': token
    });

});

export default {
    newUser,
    getAllUsers,
    loginUser,
    getUser
}