import express from "express";
import { prisma } from "../../db/prisma";
import { checkGroupBelongsToEstablishment } from "../../middleware/checkGroupBelongsToEstablishment";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/groups", loginRequired, async (req, res) => {
  const groups = await prisma.group.findMany({
    where: {
      establishmentId: req.user?.establishmentId,
    },
  });

  return res.json(groups);
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

  const result = await prisma.group.create({
    data: {
      name,
      establishmentId: req.user!.establishmentId,
    },
  });

  return res.json(result);
});

router.put("/group", loginRequired, checkGroupBelongsToEstablishment, async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      status: "error",
      msg: "id and name are required",
    });
  }

  const result = await prisma.group.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  return res.json(result);
});

router.delete("/group/:id", loginRequired, checkGroupBelongsToEstablishment, async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "error",
      msg: "group id is required",
    });
  }

  const result = await prisma.group.delete({
    where: {
      id,
    },
  });

  return res.json(result);
});

export default router;
