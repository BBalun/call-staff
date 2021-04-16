import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

// checks id and whether that group belongs to users establishment
export async function checkGroupBelongsToEstablishment(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id || req.body.id; // TODO fix this

  if (!id) {
    return res.status(400).json({
      status: "error",
      msg: "id is required",
    });
  }

  const group = await prisma.group.findUnique({
    where: {
      id,
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
