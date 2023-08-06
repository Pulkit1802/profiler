import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const prisma = new PrismaClient();

export default {
    prisma: prisma,
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    jwtToken: process.env.JWT_SECRET || "secret",
}
