import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./db/prisma";
import groupsRouter from "./routes/group";
import deviceRouter from "./routes/device";
import callRouter from "./routes/call";
import processSessionCookies from "./middleware/processSessionCookie";
import userRouter from "./routes/user";
import { errorHandler } from "./middleware/errorHandler";

const PORT = 8081;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(processSessionCookies);

app.use(groupsRouter);
app.use(deviceRouter);
app.use(callRouter);
app.use(userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

process.on("exit", (_code) => {
  prisma.$disconnect();
});
