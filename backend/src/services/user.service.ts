import { createTable, getTableDataById, getTableByWhereFields, getFirstTableByWhereFieldsWithInclude } from "./utils.service";


const createNewUser = async (data: any) => {
    return createTable('user', data, {
        userId: true, 
        email: true, 
        name: true
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
    getUserById
}