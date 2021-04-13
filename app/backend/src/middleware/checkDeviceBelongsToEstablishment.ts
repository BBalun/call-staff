import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

// checks for macAddress parameter and verifies that device belongs to users establishment
export async function checkDeviceBelongsToEstablishment(req: Request, res: Response, next: NextFunction) {
  const macAddress: string | null = req.params.macAddress;

  if (!macAddress) {
    return res.status(400).json({
      status: "error",
      msg: "missing mac address parameter",
    });
  }

  const device = await prisma.device.findUnique({
    where: {
      macAddress,
    },
  });

  if (!device) {
    return res.status(400).json({
      status: "error",
      msg: "invalid mac address",
    });
  }

  if (device.establishmentId !== req.user!.establishmentId) {
    return res.status(400).json({
      status: "error",
      msg: "device does not belong to your establishment",
    });
  }

  return next();
}
