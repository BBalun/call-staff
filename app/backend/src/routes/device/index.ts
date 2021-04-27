import express from "express";
import { prisma } from "../../db/prisma";
import { checkDeviceBelongsToEstablishment } from "../../middleware/checkDeviceBelongsToEstablishment";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/devices", loginRequired, async (req, res, next) => {
  try {
    const devices = await prisma.device.findMany({
      where: {
        establishmentId: req.user!.establishmentId,
      },
      include: {
        group: true,
      },
    });

    return res.json({ status: "ok", data: devices });
  } catch (e) {
    next(e);
  }
});

router.get("/device/:macAddress", loginRequired, async (req, res, next) => {
  // this route does not use checkDeviceBelongsToEstablishment middleware,
  // because it would result in fetching same device twice
  const { macAddress } = req.params;

  if (!macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "parameter id is missing",
    });
  }

  try {
    const device = await prisma.device.findUnique({
      where: {
        macAddress,
      },
      include: {
        group: true,
      },
    });

    if (device?.establishmentId !== req.user!.establishmentId) {
      return res.status(400).json({
        status: "error",
        msg: "device does not belong to your establishment",
      });
    }

    return res.json({ status: "ok", data: device });
  } catch (e) {
    next(e);
  }
});

router.post("/device", loginRequired, async (req, res, next) => {
  const user = req.user!;
  const { name, macAddress } = req.body;

  if (!name || !macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "name and mac address are required",
    });
  }
  try {
    const result = await prisma.device.create({
      data: {
        name,
        macAddress,
        establishmentId: user.establishmentId,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    next(e);
  }
});

router.put("/device", loginRequired, checkDeviceBelongsToEstablishment, async (req, res, next) => {
  // const { macAddress, name, battery, groupId } = req.body;
  const { macAddress, name, groupId } = req.body;

  if (!macAddress || !name) {
    return res.status(400).json({
      status: "error",
      msg: "name, mac address id are required",
    });
  }

  try {
    const result = await prisma.device.update({
      where: {
        macAddress,
      },
      data: {
        name,
        // battery,
        groupId,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    next(e);
  }
});

router.delete("/device/:macAddress", loginRequired, checkDeviceBelongsToEstablishment, async (req, res, next) => {
  const { macAddress } = req.params;

  if (!macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "missing macAddress address",
    });
  }

  try {
    const result = await prisma.device.delete({
      where: {
        macAddress,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    next(e);
  }
});

export default router;
