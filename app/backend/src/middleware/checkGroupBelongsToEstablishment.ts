import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

// checks groupId and whether that group belongs to users establishment
export async function checkGroupBelongsToEstablishment(req: Request, res: Response, next: NextFunction) {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({
      status: "error",
      msg: "groupId is required",
    });
  }

  const group = await prisma.group.findUnique({
    where: {
      id: groupId,
    },
  });

  if (!group || group.establishmentId !== req.user?.establishmentId) {
    return res.status(400).json({
      status: "error",
      msg: "invalid group id",
    });
  }

  return next();
}
