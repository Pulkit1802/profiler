import { createTable, getEntireTable, getTableDataById, getFirstTableByWhereFields } from "./utils.service";
import { nanoid } from "nanoid";
import AppError from "../utils/AppError";

const createNewapplication = async (data: any) => {

    data.id = nanoid(15);

    try {
        return await createTable('application', data, null);

    } catch (error) {
        throw new AppError('Error creating application', 500);
    }

}

const getapplication = async (applicationId: string) => {
    return await getTableDataById('application', applicationId, null);
}

const getAllapplications = async () => {
    return await getEntireTable('application', null);
}

export default {
    createNewapplication,
    getAllapplications,
    getapplication,
}