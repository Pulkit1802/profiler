import { createTable, getEntireTable, getTableDataById, getTableByWhereFields, getFirstTableByWhereFields } from "./utils.service";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import AppError from "../utils/AppError";

const createNewUser = async (data: any) => {

    data.userId = nanoid(15);

    return await createTable('user', data, {
        userId: true, 
        email: true, 
        name: true
    });

}

const getAllUsers = async () => {
    return await getEntireTable('user', {
        userId: true,
        email: true,
        name: true,
        application: true
    });
}


const loginUser = async (email: string, password: string) => {
    const user = await getFirstTableByWhereFields('user', {
        email: email,
    }, {userId: true, email: true, name: true, password: true});

    if (user === null) {
        throw new AppError('User not found', 404);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        throw new AppError('User or Password Incorrect', 401);
    }

    delete user['password'];

    return user;

}

export default {
    createNewUser,
    getAllUsers,
    loginUser
}