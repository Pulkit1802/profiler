import { createTable, getEntireTable, getTableDataById, getTableByWhereFields, getFirstTableByWhereFieldsWithInclude } from "./utils.service";
import { nanoid } from "nanoid";

const createNewUser = async (data: any) => {

    data.userId = nanoid(15);

    return createTable('user', data, {
        userId: true, 
        email: true, 
        name: true
    });
}


const getAllUsers = async () => {
    return getEntireTable('user', {
        userId: true,
        email: true,
        name: true,
        application: true
    });
}


const getUserById = async (id: string) => {
    return getTableDataById('user', id, {
        userId: true, 
        email: true, 
        name: true
    });
}

export default {
    createNewUser,
    getAllUsers,
}