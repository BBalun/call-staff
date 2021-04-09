import express from "express";
import { prisma } from "../db/prisma";

const router = express.Router();

router.get("/calls", async (req, res) => {
  const where: any = {};

  if (req.query.finished === "false") {
    where.time_finished = null;
  }

  if (req.query.group_id && parseInt(req.query.group_id as string)) {
    where.device = { group_id: parseInt(req.query.group_id as string) };
  }

  const result = await prisma.call.findMany({
    where,
  });

  return res.json(result);
});

router.post("/call", async (req, res) => {
  let { batteryLevel, button, deviceAddress, gatewayAddress } = req.body; // TODO validation
  button = parseInt(button);
  batteryLevel = parseInt(batteryLevel);

  const device = await prisma.device.findUnique({
    select: {
      id: true,
    },
    where: {
      mac_address: deviceAddress,
    },
  });

  // if (!device && new_unknown_device_flag) {
  //   new_unknown_device_address = deviceAddress;
  //   return res.status(200).end();
  // }

  if (!device) {
    return res.status(401).end();
  }

  await prisma.call.create({
    data: {
      battery_level: batteryLevel,
      button,
      device_id: device.id,
    },
  });

  res.status(201).end();
});

router.put("/call/:id/finish", async (req, res) => {
  const id = parseInt(req.params.id);
  if (!id) {
    return res.status(400).end();
  }

  await prisma.call.update({
    where: {
      id: id,
    },
    data: {
      time_finished: new Date(),
    },
  });

  return res.json({ status: "ok" });
});

export default router;
