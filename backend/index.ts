import express from "express";
import cors from "cors";
import process from "process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chatRouter from "./Chat/ChatRouter.js";
import eventRouter from "./Event/EventRouter.js";
import { prisma } from "../bot/src/service/db.js";

const app = express();
const PORT = process.env.PORT_BACKEND || 5000;
const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDistPath = path.resolve(currentDir, "../frontend/dist");

app.use(express.json());
app.use(cors());
app.use('/', chatRouter)
app.use('/', eventRouter) 

if (existsSync(frontendDistPath)) {
    app.use(express.static(frontendDistPath));
    app.use((req, res, next) => {
        if (req.method !== "GET") {
            next();
            return;
        }

        res.sendFile(path.join(frontendDistPath, "index.html"), (error) => {
            if (error) {
                next(error);
            }
        });
    });
}

const start = async () => {
    try {
        await prisma.$connect()
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
