import express from "express";
import { prisma } from "../../db/prisma";
import loginRequired from "../../middleware/loginRequired";

const router = express.Router();

router.get("/establishment", loginRequired, async (req, res, next) => {
  const user = req.user!;

  try {
    const establishment = await prisma.establishment.findUnique({
      where: {
        id: user.establishmentId,
      },
    });
    return res.json({ status: "ok", data: establishment });
  } catch (e) {
    next(e);
    return;
  }
});

router.put("/establishment", loginRequired, async (req, res, next) => {
  const user = req.user!;
  const { id, name, button1, button2, button3, button4, button5 } = req.body;

  if (!id || !name || !button1 || !button2 || !button3 || !button4 || !button5) {
    return res.status(400).json({
      status: "error",
      msg: "id, name, button1-button5 are required",
    });
  }

  if (user.establishmentId !== id) {
    return res.status(400).json({
      status: "error",
      msg: "invalid establishment id",
    });
  }

  try {
    const result = await prisma.establishment.update({
      where: {
        id,
      },
      data: {
        name,
        button1,
        button2,
        button3,
        button4,
        button5,
      },
    });

    return res.json({ status: "ok", data: result });
  } catch (e) {
    next(e);
    return;
  }
});

export default router;
