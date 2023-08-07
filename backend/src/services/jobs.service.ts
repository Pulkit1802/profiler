import { createTable, getEntireTable, getTableDataById, getFirstTableByWhereFields } from "./utils.service";
import { nanoid } from "nanoid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import AppError from "../utils/AppError";

const createNewjob = async (data: any) => {

    data.id = nanoid(15);

    try {
        return await createTable('job', data, {
            id: true, 
            title: true, 
            description: true,
            salary: true,
            location: true,
        });

    } catch (error) {
        
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
            throw new AppError('job already exists', 409);

        throw new AppError('Error creating job', 500);
    }

}

const getjob = async (jobId: string) => {
    return await getTableDataById('job', jobId, {
        id: true, 
        title: true, 
        description: true,
        salary: true,
        location: true,
    });
}

const getAlljobs = async () => {
    return await getEntireTable('job', {
        id: true, 
        title: true, 
        description: true,
        salary: true,
        location: true,
    });
}

export default {
    createNewjob,
    getAlljobs,
    getjob,
}