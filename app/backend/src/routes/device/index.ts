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
      orderBy: {
        name: "asc",
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
  const { name, macAddress, groupId } = req.body;

  if (!name || !macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "name and mac address are required",
    });
  }

  const macRegex = new RegExp("^[a-fA-F0-9]{2}(:[a-fA-F0-9]{2}){5}$");
  if (!macRegex.test(macAddress)) {
    return res.status(400).json({
      status: "error",
      msg: "invalid format of mac address",
    });
  }

  try {
    const result = await prisma.device.create({
      data: {
        name,
        macAddress: macAddress.toLowerCase(),
        establishmentId: user.establishmentId,
        groupId,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    return res.status(400).json({ status: "error", msg: "name and mac address has to be unique" });
  }
});

router.put("/device", loginRequired, checkDeviceBelongsToEstablishment, async (req, res, next) => {
  const { macAddress, name, groupId } = req.body;

  if (!macAddress || !name) {
    return res.status(400).json({
      status: "error",
      msg: "name, mac address id are required",
    });
  }

  const macRegex = new RegExp("^[a-fA-F0-9]{2}(:[a-fA-F0-9]{2}){5}$");
  if (!macRegex.test(macAddress)) {
    return res.status(400).json({
      status: "error",
      msg: "invalid format of mac address",
    });
  }

  if (groupId) {
    try {
      const group = await prisma.group.findUnique({
        where: {
          id: groupId,
        },
      });
      if (!group) {
        return res.status(400).json({ status: "error", msg: "group does not exits" });
      }
    } catch (e) {
      next(e);
      return;
    }
  }

  try {
    const result = await prisma.device.update({
      where: {
        macAddress,
      },
      data: {
        name,
        groupId,
      },
    });

    if (!result) {
      return res.status(400).json({ status: "error", msg: "MAC address is invalid" });
    }

    return res.json({ status: "ok", data: result });
  } catch (e) {
    return res.status(400).json({ status: "error", msg: "Device with same name already exists" });
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
    await prisma.request.deleteMany({
      where: {
        deviceMac: macAddress,
      },
    });

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
