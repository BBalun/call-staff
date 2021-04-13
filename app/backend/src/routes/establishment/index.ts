import express from "express";
import { prisma } from "../../db/prisma";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/establishment", loginRequired, async (req, res) => {
  const user = req.user!;

  const establishment = await prisma.establishment.findUnique({
    where: {
      id: user.establishmentId,
    },
  });
  return res.json(establishment);
});

router.put("/establishment", loginRequired, async (req, res) => {
  const user = req.user!;
  const { id, name, button1, button2, button3, button4, button5 } = req.body;

  if (!id || !name || !button1 || !button2 || !button3 || !button4 || !button5) {
    return res.status(400).json({
      status: "error",
      msg: "id or name is missing",
    });
  }

  if (user.establishmentId !== id) {
    return res.status(400).json({
      status: "error",
      msg: "invalid id",
    });
  }

  const result = await prisma.establishment.update({
    where: {
      id,
    },
    data: {
      id,
      name,
      button1,
      button2,
      button3,
      button4,
      button5,
    },
  });

  return res.json(result);
});

export default router;
