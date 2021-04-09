import express from "express";
import cors from "cors";
import { prisma } from "./db/prisma";

import groupsRouter from "./routes/group";
import deviceRouter from "./routes/device";
import callRouter from "./routes/call";

const PORT = 8081;

const app = express();

app.use(cors());
app.use(express.json());

app.use(groupsRouter);
app.use(deviceRouter);
app.use(callRouter);

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

process.on("exit", (code) => {
  prisma.$disconnect();
});
