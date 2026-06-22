import express from "express";
import cors from "cors";
import process from "process";
import chatRouter from "./Chat/ChatRouter.js";
import eventRouter from "./Event/EventRouter.js";
import { prisma } from "../bot/src/service/db.js";

const app = express();
const PORT = process.env.PORT_BACKEND || 5000;

app.use(express.json());
app.use(cors());
app.use('/', chatRouter)
app.use('/', eventRouter) 

const start = async () => {
    try {
        await prisma.$connect()
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
