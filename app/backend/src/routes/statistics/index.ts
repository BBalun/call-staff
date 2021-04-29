import express from "express";
import { prisma } from "../../db/prisma";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/statistics/requests/hourly", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    // const result = await prisma.$queryRaw<[{ hours_ago: number; count: number }]>(
    //   `SELECT series AS hours_ago, coalesce(count, 0) AS count FROM generate_series(0,23) AS series LEFT OUTER JOIN
    //   (SELECT floor((extract (epoch FROM NOW() - time)) / 3600)AS hours_ago, count(*) FROM request JOIN device ON request.device_mac=device.mac_address WHERE (time >= NOW() - INTERVAL '24 HOURS') AND (device.establishment_id='${user.establishmentId}') GROUP BY hours_ago) AS main
    //   ON series.series=main.hours_ago ORDER BY hours_ago`
    // );

    const result = await prisma.$queryRaw<[{ time: string; count: string }]>(
      `SELECT series.hour as time, coalesce(count , 0) AS count
      FROM (SELECT date_trunc('hour', NOW() - series * INTERVAL '1 hour') AS hour FROM generate_series(0, 23) AS series) AS series
      LEFT OUTER JOIN
      (
      SELECT date_trunc('hour', time) AS hour, count(*) FROM request JOIN device ON request.device_mac=device.mac_address 
        WHERE (time >= NOW() - INTERVAL '24 HOURS') AND (device.establishment_id='${user.establishmentId}')  
        GROUP BY hour
      ) as main
      on series.hour=main.hour`
    );

    return res.json({
      status: "ok",
      data: result.map((x) => {
        return {
          time: new Date(x.time),
          count: x.count,
        };
      }),
    });
  } catch (e) {
    next(e);
    return;
  }
});

router.get("/statistics/requests/daily", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    // const result = await prisma.$queryRaw<[{ days_ago: number; count: number }]>(
    //   `SELECT series AS days_ago, coalesce(count, 0) AS count FROM generate_series(0,21) AS series LEFT OUTER JOIN
    //   (SELECT floor((extract (epoch FROM NOW() - time)) / (3600 * 24)) AS days_ago, count(*) FROM request JOIN device ON request.device_mac=device.mac_address WHERE (time >= NOW() - INTERVAL '3 WEEKS') AND (device.establishment_id='${user.establishmentId}') GROUP BY days_ago) AS main
    //   ON series.series=main.days_ago ORDER BY days_ago`
    // );

    const result = await prisma.$queryRaw<[{ time: string; count: string }]>(
      `SELECT series.time as time, coalesce(count , 0) AS count
      FROM (SELECT date_trunc('day', NOW() - series * INTERVAL '1 day') AS time FROM generate_series(0, 21) AS series) AS series
      LEFT OUTER JOIN
      (
      SELECT date_trunc('day', time) AS time_trunc, count(*) FROM request JOIN device ON request.device_mac=device.mac_address 
        WHERE (time >= NOW() - INTERVAL '3 WEEKS') AND (device.establishment_id='${user.establishmentId}')  
        GROUP BY time_trunc
      ) as main
      on series.time=main.time_trunc`
    );

    return res.json({
      status: "ok",
      data: result.map((x) => {
        return {
          time: new Date(x.time),
          count: x.count,
        };
      }),
    });
  } catch (e) {
    next(e);
    return;
  }
});

router.get("/statistics/requests/monthly", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    // const result = await prisma.$queryRaw<[{ months_ago: number; count: number }]>(
    //   `SELECT series AS months_ago, coalesce(count, 0) AS count FROM generate_series(0,12) AS series LEFT OUTER JOIN
    //   (SELECT floor((extract (epoch FROM NOW() - time)) / (3600 * 24 * 30)) AS months_ago, count(*) FROM request JOIN device ON request.device_mac=device.mac_address WHERE (time >= NOW() - INTERVAL '1 YEAR') AND (device.establishment_id='${user.establishmentId}') GROUP BY months_ago) AS main
    //   ON series.series=main.months_ago ORDER BY months_ago`
    // );

    const result = await prisma.$queryRaw<[{ time: string; count: string }]>(
      `SELECT series.time as time, coalesce(count , 0) AS count
      FROM (SELECT date_trunc('month', NOW() - series * INTERVAL '1 month') AS time FROM generate_series(0, 12) AS series) AS series
      LEFT OUTER JOIN
      (
      SELECT date_trunc('month', time) AS time_trunc, count(*) FROM request JOIN device ON request.device_mac=device.mac_address 
        WHERE (time >= NOW() - INTERVAL '1 YEAR') AND (device.establishment_id='${user.establishmentId}')  
        GROUP BY time_trunc
      ) as main
      on series.time=main.time_trunc`
    );

    return res.json({
      status: "ok",
      data: result.map((x) => {
        return {
          time: new Date(x.time),
          count: x.count,
        };
      }),
    });
  } catch (e) {
    next(e);
    return;
  }
});

router.get("/statistics/finishTime/hourly", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    const result = await prisma.$queryRaw<[{ time: string; avg_secs: number }]>(
      // `SELECT series.time as time, TO_CHAR(date_trunc('seconds', coalesce(avg, INTERVAL '0 days')), 'HH24:MI:SS') AS avg
      // FROM (SELECT date_trunc('hours', NOW() - series * INTERVAL '1 hour') AS time FROM generate_series(0, 24) AS series) AS series
      // LEFT OUTER JOIN
      // (
      // SELECT date_trunc('hours', time) AS time_trunc, AVG(time_finished - time)
      // FROM request JOIN device ON request.device_mac=device.mac_address
      // WHERE (time >= NOW() - INTERVAL '24 HOURS')
      //   AND (device.establishment_id='${user.establishmentId}')
      //   AND request.time_finished IS NOT NULL
      // GROUP BY time_trunc
      // ) AS main
      // ON series.time = main.time_trunc`
      `SELECT series.time as time, coalesce(avg_secs, 0) AS avg_secs
      FROM (SELECT date_trunc('hours', NOW() - series * INTERVAL '1 hour') AS time FROM generate_series(0, 24) AS series) AS series
      LEFT OUTER JOIN
      (
      SELECT date_trunc('hours', time) AS time_trunc, FLOOR(EXTRACT(epoch FROM AVG(time_finished - time))) AS avg_secs
      FROM request JOIN device ON request.device_mac=device.mac_address 
      WHERE (time >= NOW() - INTERVAL '24 HOURS') 
        AND (device.establishment_id='${user.establishmentId}')
        AND request.time_finished IS NOT NULL
      GROUP BY time_trunc
      ) AS main
      ON series.time = main.time_trunc`
    );

    const formattedResult = result.map((x) => {
      return {
        time: new Date(x.time),
        avgInSecs: x.avg_secs,
      };
    });

    return res.json({ status: "ok", data: formattedResult });
  } catch (e) {
    next(e);
    return;
  }
});

router.get("/statistics/finishTime/daily", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    const result = await prisma.$queryRaw<[{ time: string; avg_secs: number }]>(
      // `SELECT series.time as time, TO_CHAR(date_trunc('seconds', coalesce(avg, INTERVAL '0 days')), 'HH24:MI:SS') AS avg
      // FROM (SELECT date_trunc('days', NOW() - series * INTERVAL '24 hours') AS time FROM generate_series(0, 21) AS series) AS series
      // LEFT OUTER JOIN
      // (
      // SELECT date_trunc('days', time) AS time_trunc, AVG(time_finished - time)
      // FROM request JOIN device ON request.device_mac=device.mac_address
      // WHERE (time >= NOW() - INTERVAL '3 WEEKS')
      //   AND (device.establishment_id='${user.establishmentId}')
      //   AND request.time_finished IS NOT NULL
      // GROUP BY time_trunc
      // ) AS main
      // ON series.time = main.time_trunc`
      `SELECT series.time as time, coalesce(avg_secs, 0) AS avg_secs
      FROM (SELECT date_trunc('days', NOW() - series * INTERVAL '24 hour') AS time FROM generate_series(0, 21) AS series) AS series
      LEFT OUTER JOIN
      (
      SELECT date_trunc('days', time) AS time_trunc, FLOOR(EXTRACT(epoch FROM AVG(time_finished - time))) AS avg_secs
      FROM request JOIN device ON request.device_mac=device.mac_address 
      WHERE (time >= NOW() - INTERVAL '3 WEEKS') 
        AND (device.establishment_id='${user.establishmentId}')
        AND request.time_finished IS NOT NULL
      GROUP BY time_trunc
      ) AS main
      ON series.time = main.time_trunc`
    );

    const formattedResult = result.map((x) => {
      return {
        time: new Date(x.time),
        avgInSecs: x.avg_secs,
      };
    });

    return res.json({ status: "ok", data: formattedResult });
  } catch (e) {
    next(e);
    return;
  }
});

router.get("/statistics/finishTime/monthly", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    const result = await prisma.$queryRaw<[{ time: string; avg_secs: number }]>(
      // `SELECT series.time as time, TO_CHAR(date_trunc('seconds', coalesce(avg, INTERVAL '0 days')), 'HH24:MI:SS') AS avg
      // FROM (SELECT date_trunc('months', NOW() - series * INTERVAL '1 MONTH') AS time FROM generate_series(0, 12) AS series) AS series
      // LEFT OUTER JOIN
      // (
      // SELECT date_trunc('months', time) AS time_trunc, AVG(time_finished - time)
      // FROM request JOIN device ON request.device_mac=device.mac_address
      // WHERE (time >= NOW() - INTERVAL '1 YEAR')
      //   AND (device.establishment_id='${user.establishmentId}')
      //   AND request.time_finished IS NOT NULL
      // GROUP BY time_trunc
      // ) AS main
      // ON series.time = main.time_trunc`
      `SELECT series.time as time, coalesce(avg_secs, 0) AS avg_secs
      FROM (SELECT date_trunc('months', NOW() - series * INTERVAL '1 MONTH') AS time FROM generate_series(0, 12) AS series) AS series
      LEFT OUTER JOIN
      (
      SELECT date_trunc('months', time) AS time_trunc, FLOOR(EXTRACT(epoch FROM AVG(time_finished - time))) AS avg_secs
      FROM request JOIN device ON request.device_mac=device.mac_address 
      WHERE (time >= NOW() - INTERVAL '12 MONTHS') 
        AND (device.establishment_id='${user.establishmentId}')
        AND request.time_finished IS NOT NULL
      GROUP BY time_trunc
      ) AS main
      ON series.time = main.time_trunc`
    );

    const formattedResult = result.map((x) => {
      return {
        time: new Date(x.time),
        avgInSecs: x.avg_secs,
      };
    });

    return res.json({ status: "ok", data: formattedResult });
  } catch (e) {
    next(e);
    return;
  }
});

export default router;
