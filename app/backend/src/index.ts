import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { prisma } from "./db/prisma";
import processSessionCookies from "./middleware/processSessionCookie";
import router from "./routes/index";
import morgan from "morgan";

const PORT = 8081;

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(processSessionCookies);
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`app started on port ${PORT}`);
});

process.on("exit", (_code) => {
  prisma.$disconnect();
});
