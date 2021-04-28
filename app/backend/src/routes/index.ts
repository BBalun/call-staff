import express from "express";

import groupsRouter from "./group";
import deviceRouter from "./device";
import callRouter from "./request";
import userRouter from "./user";
import { errorHandler } from "../middleware/errorHandler";
import establishmentRouter from "./establishment";
import statisticsRouter from "./statistics";

const router = express.Router();

router.use(groupsRouter);
router.use(deviceRouter);
router.use(callRouter);
router.use(userRouter);
router.use(establishmentRouter);
router.use(statisticsRouter);

router.use(errorHandler);

export default router;
