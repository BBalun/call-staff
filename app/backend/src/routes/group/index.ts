import express from "express";
import { prisma } from "../../db/prisma";
import { checkGroupBelongsToEstablishment } from "../../middleware/checkGroupBelongsToEstablishment";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/groups", loginRequired, async (req, res, next) => {
  try {
    const groups = await prisma.group.findMany({
      where: {
        establishmentId: req.user?.establishmentId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return res.json({ status: "ok", data: groups });
  } catch (e) {
    next(e);
  }
});

router.get("/group/:id", loginRequired, checkGroupBelongsToEstablishment, async (req, res) => {
  const { id } = req.params;

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

  return res.json(group);
});

router.post("/group", loginRequired, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "error",
      msg: "name is required",
    });
  }

  try {
    const result = await prisma.group.create({
      data: {
        name,
        establishmentId: req.user!.establishmentId,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (err) {
    return res.status(400).json({ status: "error", msg: "name has to be unique" });
  }
});

router.put("/group", loginRequired, checkGroupBelongsToEstablishment, async (req, res, next) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      status: "error",
      msg: "id and name are required",
    });
  }

  try {
    const group = await prisma.group.findUnique({
      where: {
        id: id,
      },
    });
    if (!group) {
      return res.status(400).json({ status: "error", msg: "group with specified id does not exits" });
    }
  } catch (e) {
    return next(e);
  }

  try {
    const result = await prisma.group.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    return res.status(400).json({ status: "error", msg: "group with same name already exists" });
  }
});

router.delete("/group/:id", loginRequired, checkGroupBelongsToEstablishment, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "error",
      msg: "group id is required",
    });
  }

  try {
    const result = await prisma.group.delete({
      where: {
        id,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    return res.status(400).json({ status: "error", msg: "group not found" });
  }
});

export default router;
