import express from "express";
import { prisma } from "../../db/prisma";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/requests", loginRequired, async (req, res, next) => {
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

  try {
    const result = await prisma.request.findMany({
      where,
      orderBy: {
        time: "asc",
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/request", async (req, res, next) => {
  let { batteryLevel, button, deviceAddress, gatewayAddress } = req.body; // TODO validation
  batteryLevel = parseInt(batteryLevel);
  button = parseInt(button);

  if (!deviceAddress || !button || !batteryLevel) {
    return res.status(400).json({
      status: "error",
      msg: "deviceAddress, batteryLevel and button are required",
    });
  }

  try {
    const device = await prisma.device.findUnique({
      where: {
        macAddress: deviceAddress,
      },
    });

    if (!device) {
      return res.status(400).json({ status: "error", msg: "invalid mac address" });
    }

    const newRequest = await prisma.request.create({
      data: {
        battery: batteryLevel,
        button,
        deviceMac: deviceAddress,
      },
    });

    return res.json({ status: "ok", data: newRequest });
  } catch (e) {
    next(e);
  }
});

router.put("/request/:id/finish", loginRequired, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: "error",
      msg: "parameter id is required",
    });
  }

  try {
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

    return res.json({ status: "ok", data: result });
  } catch (e) {
    next(e);
  }
});

export default router;
