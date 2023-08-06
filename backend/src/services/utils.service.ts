import config from "../utils/config";
import AppError from "utils/AppError";

export const createTable = async (model: string, data: any, select?:any) => {
    // @ts-ignore
    return config.prisma[model].create({
        data: data,
        select: select
    });
}

export const getEntireTable = async (model: string, select?:any) => {
    // @ts-ignore
    return config.prisma[model].findMany({
        select: select
    });
}

export const getTableDataById = async (model: string, id: string, select?:any) => {
    // @ts-ignore
    let entry = await config.prisma[model].findUnique({
        where: {
            id: id
        },
        select: select
    });

    if (entry === null) {
        throw new AppError(`${model} not found`, 404);
    }

    return entry;

    
}

export const updateTableDataById = async (model: string, id: string, data: any, select?:any) => {
    // @ts-ignore

    return config.prisma[model].update({
        where: {
            id: id
        },
        data: data,
        select: select
    });
}

export const updateTableDataByWhereFields = async (model: string, where: any, data: any, select?:any) => {
    // @ts-ignore

    return config.prisma[model].update({
        where: where,
        data: data,
        select: select
    });
}

export const getTableByWhereFields = async (model: string, where: any, select?:any) => {
    // @ts-ignore

    return config.prisma[model].findMany({
        where: where,
        select: select
    });
}

export const getFirstTableByWhereFields = async (model: string, where: any, select?:any) => {
    // @ts-ignore

    return config.prisma[model].findFirst({
        where: where,
        select: select
    });
}

export const deleteTableDataById = async (model: string, id: string) => {
    // @ts-ignore

    return config.prisma[model].delete({
        where: {
            id: id
        }
    });
}

export const deleteTableDataByWhereFields = async (model: string, where: any) => {
    // @ts-ignore

    return config.prisma[model].deleteMany({
        where: where
    });
}