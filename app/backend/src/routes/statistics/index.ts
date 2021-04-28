import express from "express";
import { prisma } from "../../db/prisma";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/statistics/requests/hourly", loginRequired, async (req, res, next) => {
  const user = req.user!;
  // SELECT series as hours_ago, coalesce(count, 0) FROM generate_series(0,23) as series left outer join (
  // select floor((extract (epoch from NOW() - time)) / 3600) as hours_ago, count(*) from request where time >= NOW() - INTERVAL '24 HOURS' group by hours_ago
  // ) as main on series.series= main.hours_ago order by

  // const res = await prisma.request.groupBy({

  // })
});

router.get("/statistics/requests/daily", loginRequired, async (req, res, next) => {});

router.get("/statistics/requests/monthly", loginRequired, async (req, res, next) => {});

router.get("/statistics/finishTime/hourly", loginRequired, async (req, res, next) => {});

router.get("/statistics/finishTime/daily", loginRequired, async (req, res, next) => {});

router.get("/statistics/finishTime/monthly", loginRequired, async (req, res, next) => {});

export default router;
