import { createTable, getEntireTable, getTableDataById, getTableByWhereFields, getFirstTableByWhereFields } from "./utils.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';
import AppError from "../utils/AppError";

const loginhr = async (email: string, password: string) => {
    const hr = await getFirstTableByWhereFields('hr', {
        email: email,
    }, {id: true, email: true, name: true, password: true});

    if (hr === null) {
        throw new AppError('hr not found', 404);
    }

    const checkPassword = await bcrypt.compare(password, hr.password);

    if (!checkPassword) {
        throw new AppError('hr or Password Incorrect', 401);
    }

    delete hr['password'];
    hr['role'] = 'hr';

    return hr;

}

const createNewhr = async (data: any) => {

    data.id = nanoid(15);

    try {
        return await createTable('hr', data, {
            id: true, 
            email: true, 
            name: true
        });
        
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
            throw new AppError('hr already exists', 409);

        throw new AppError('Error creating hr', 500);

    }

}

const gethr = async (hrId: string) => {
    return await getTableDataById('hr', hrId, {
        id: true,
        email: true,
        name: true,
        application: true
    });
}

const getAllhrs = async () => {
    return await getEntireTable('hr', {
        id: true,
        email: true,
        name: true,
        application: true
    });
}

export default {
    createNewhr,
    getAllhrs,
    gethr,
    loginhr
}