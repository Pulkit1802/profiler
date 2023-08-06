import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import catchAsync from '../utils/catchAsync';
import userService from '../services/user.service';


const newUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const saltRounds = 10;
    const body = req.body;

    const passwordHash = await bcrypt.hash(body.password, saltRounds);
    body.password = passwordHash;

    const newUser = await userService.createNewUser(body);

    res.status(201).json(newUser);

});


const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const allUsers = await userService.getAllUsers();

    res.status(200).json(allUsers);
});


export default {
    newUser,
    getAllUsers
}