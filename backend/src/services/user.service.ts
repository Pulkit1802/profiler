import { createTable, getEntireTable, getTableDataById, getTableByWhereFields, getFirstTableByWhereFields } from "./utils.service";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';

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
        throw new Error('User not found');
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
        throw new Error('Email or password is incorrect');
    }

    delete user['password'];

    return user;

}

export default {
    createNewUser,
    getAllUsers,
    loginUser
}