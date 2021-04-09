import express from "express";
import { prisma } from "../db/prisma";

const router = express.Router();

router.get("/groups", async (req, res) => {
  const groups = await prisma.group.findMany();
  res.json(groups);
});

router.get("/group/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).end();
  }

  const group = await prisma.group.findUnique({
    where: {
      id,
    },
  });

  return res.json(group);
});

router.post("/group", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).end();
  }

  await prisma.group.create({
    data: {
      name,
    },
  });

  res.status(201).end();
});

router.put("/group", async (req, res) => {
  const id = parseInt(req.body.id);
  const name = req.body.name;

  if (!id || !name) {
    return res.status(400).end();
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

router.delete("/group/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).end();
  }

  const result = await prisma.group.delete({
    where: {
      id,
    },
  });

  return res.json(result);
});

export default router;
