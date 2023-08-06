import { createTable, getEntireTable, getTableDataById, getFirstTableByWhereFields } from "./utils.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import AppError from "../utils/AppError";

const loginUser = async (email: string, password: string) => {
    const user = await getFirstTableByWhereFields('user', {
        email: email,
    }, {id: true, email: true, name: true, password: true});

    if (user === null) {
        throw new AppError('Incorrect email or password', 404);
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        throw new AppError('Incorrect email or password', 401);
    }

    delete user['password'];
    user['role'] = 'user';

    return user;

}

const createNewUser = async (data: any) => {

    data.id = nanoid(15);

    try {
        return await createTable('user', data, {
            id: true, 
            email: true, 
            name: true
        });

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
            throw new AppError('User already exists', 409);

        throw new AppError('Error creating user', 500);

    }

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