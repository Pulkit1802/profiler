import { createTable, getEntireTable, getTableDataById, getTableByWhereFields, getFirstTableByWhereFields } from "./utils.service";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import AppError from "../utils/AppError";

const loginUser = async (email: string, password: string) => {
    const user = await getFirstTableByWhereFields('user', {
        email: email,
    }, {id: true, email: true, name: true, password: true});

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

const createNewUser = async (data: any) => {

    data.id = nanoid(15);

    return await createTable('user', data, {
        id: true, 
        email: true, 
        name: true
    });

}

const getUser = async (userId: string) => {
    return await getTableDataById('user', userId, {
        id: true,
        email: true,
        name: true,
        application: true
    });
}

const getAllUsers = async () => {
    return await getEntireTable('user', {
        id: true,
        email: true,
        name: true,
        application: true
    });
}

export default {
    createNewUser,
    getAllUsers,
    getUser,
    loginUser
}