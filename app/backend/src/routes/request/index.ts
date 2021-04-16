import express from "express";
import { prisma } from "../../db/prisma";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/requests", loginRequired, async (req, res) => {
  const where: any = {
    device: {
      establishmentId: req.user!.establishmentId,
    },
  };

  if (req.query.finished === "false") {
    where.timeFinished = null;
  } else if (req.query.finished === "true") {
    where.NOT = { timeFinished: null };
  }

  if (req.query.groupId) {
    where.device = { ...where.device, groupId: req.query.groupId };
  }

  const result = await prisma.request.findMany({
    where,
  });

  return res.json(result);
});

router.post("/request", async (req, res) => {
  let { batteryLevel, button, deviceAddress, gatewayAddress } = req.body; // TODO validation
  batteryLevel = parseInt(batteryLevel);
  button = parseInt(button);

  if (!deviceAddress || !button || !batteryLevel) {
    return res.status(400).json({
      status: "error",
      msg: "deviceAddress, batteryLevel and button are required",
    });
  }

  const device = await prisma.device.findUnique({
    where: {
      macAddress: deviceAddress,
    },
  });

  if (!device) {
    return res.status(400).end();
  }

  const newRequest = await prisma.request.create({
    data: {
      battery: batteryLevel,
      button,
      deviceMac: deviceAddress,
    },
  });

  return res.json(newRequest);
});

router.put("/request/:id/finish", loginRequired, async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "error",
      msg: "parameter id is required",
    });
  }

  const request = await prisma.request.findUnique({
    where: {
      id,
    },
    select: {
      device: {
        select: {
          establishmentId: true,
        },
      },
    },
  });

  if (request?.device.establishmentId !== req.user!.establishmentId) {
    return res.status(400).json({
      status: "error",
      msg: "request does not exist or you are trying to finish request that does not belong to your establishment",
    });
  }

  const result = await prisma.request.update({
    where: {
      id: id,
    },
    data: {
      timeFinished: new Date(),
    },
  });

  return res.json(result);
});

export default router;
