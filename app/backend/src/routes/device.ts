import express from "express";
import { prisma } from "../db/prisma";

const router = express.Router();

// let new_unknown_device_flag = false;
// let new_unknown_device_address: string | null = null;

router.get("/devices", async (req, res) => {
  const devices = await prisma.device.findMany();
  res.json(devices);
});

router.get("/device/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({ status: "error", msg: "parameter id is missing" });
  }

  const device = await prisma.device.findUnique({
    where: {
      id,
    },
  });

  return res.json(device);
});

router.post("/device", async (req, res) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).end();
  }

  await prisma.device.create({
    data: {
      name,
      mac_address: address,
    },
  });
  return res.status(401).end();
  // const { name } = req.body;
  // const timeout = 10;
  // new_unknown_device_flag = true;

  // for (let i = 0; i < timeout; i++) {
  //   await delay(1000);

  //   if (new_unknown_device_address) {
  //     await prisma.device.create({
  //       data: {
  //         mac_address: new_unknown_device_address,
  //         name,
  //       },
  //     });
  //     new_unknown_device_address = null;
  //     new_unknown_device_flag = false;
  //     return res.status(201).json({ status: "ok" });
  //   }
  // }

  // new_unknown_device_address = null;
  // new_unknown_device_flag = false;
  // return res.json({ status: "error", msg: "device was not found" });
});

router.put("/device", async (req, res) => {
  const id = parseInt(req.body.id);
  const { name, mac_address } = req.body;
  const group_id = parseInt(req.body.group_id);

  if (!id || !name || !mac_address || !group_id) {
    return res.status(400).end();
  }

  const result = await prisma.device.update({
    where: {
      id,
    },
    data: {
      name,
      mac_address,
      group_id,
    },
  });

  return res.json(result);
});

router.delete("/device/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).end();
  }

  const result = await prisma.device.delete({
    where: {
      id,
    },
  });

  return res.json(result);
});

export default router;
