import express, { Request, Response, NextFunction } from "express";
import { prisma } from "../../db/prisma";
import { checkDeviceBelongsToEstablishment } from "../../middleware/checkDeviceBelongsToEstablishment";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/devices", loginRequired, async (req, res) => {
  const devices = await prisma.device.findMany({
    where: {
      establishmentId: req.user!.establishmentId,
    },
  });

  return res.json(devices);
});

router.get("/device/:macAddress", loginRequired, async (req, res) => {
  // this route does not use checkDeviceBelongsToEstablishment middleware,
  // because it would result in fetching same device twice
  const { macAddress } = req.params;

  if (!macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "parameter id is missing",
    });
  }

  const device = await prisma.device.findUnique({
    where: {
      macAddress,
    },
  });

  if (device?.establishmentId !== req.user!.establishmentId) {
    return res.status(400).json({
      status: "error",
      msg: "device does not belong to your establishment",
    });
  }

  return res.json(device);
});

router.post("/device", loginRequired, async (req, res) => {
  const user = req.user!;
  const { name, macAddress } = req.body;

  if (!name || !macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "name and mac address are required",
    });
  }

  const result = await prisma.device.create({
    data: {
      name,
      macAddress,
      establishmentId: user.establishmentId,
    },
  });

  return res.json(result);
});

router.put("/device/:macAddress", loginRequired, checkDeviceBelongsToEstablishment, async (req, res) => {
  const { name, battery, groupId } = req.body;
  const macAddress = req.params.macAddress;

  if (!macAddress || !name || !battery || !groupId) {
    return res.status(400).json({
      status: "error",
      msg: "name, mac address and group id are required",
    });
  }

  const result = await prisma.device.update({
    where: {
      macAddress,
    },
    data: {
      name,
      battery,
      groupId,
    },
  });

  return res.json(result);
});

router.delete("/device/:macAddress", loginRequired, checkDeviceBelongsToEstablishment, async (req, res) => {
  const { macAddress } = req.params;

  if (!macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "missing macAddress address",
    });
  }

  const result = await prisma.device.delete({
    where: {
      macAddress,
    },
  });

  return res.json(result);
});

export default router;
