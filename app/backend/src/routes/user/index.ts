import express from "express";
import { prisma } from "../../db/prisma";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import loginRequired from "../../middleware/loginRequired";
import adminOnly from "../../middleware/adminOnly";

const router = express.Router();

router.get("/user", loginRequired, (req, res) => {
  return res.status(200).json({
    status: "ok",
    data: req.user,
  });
});

router.post("/register", loginRequired, adminOnly, async (req, res, next) => {
  const { username, email, password, establishmentName } = req.body;

  if (!username || !email || !password || !establishmentName) {
    return res.status(400).json({
      status: "error",
      msg: "email, username, password and establishment name are required",
    });
  }

  try {
    // check if user already exists
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return res.status(400).json({
        status: "error",
        msg: "email or username already exists",
      });
    }

    // insert new user to db
    const newUser = await prisma.user.create({
      data: {
        username,
        password: await bcrypt.hash(password, 10),
        email,
        session: uuid(),
        role: {
          connect: {
            name: "manager",
          },
        },
        establishment: {
          create: {
            name: establishmentName,
          },
        },
      },
      select: {
        session: true,
      },
    });

    // set session cookie
    res.cookie("session", newUser.session, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // one week
    });

    return res.json({
      status: "ok",
    });
  } catch (e) {
    next(e);
    return;
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      msg: "email and password are required",
    });
  }

  try {
    // check user credentials
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        session: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        status: "error",
        msg: "email or password is incorrect",
      });
    }

    // check password
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "error",
        msg: "email or password is incorrect",
      });
    }

    // need to check for session, because session can be deleted from db if user tries to log out from all devices
    if (!user.session) {
      // create user session
      const result = await prisma.user.update({
        data: {
          session: uuid(),
        },
        where: {
          id: user.id,
        },
        select: {
          session: true,
        },
      });
      user.session = result.session;
    }

    // set session cookie
    res.cookie("session", user.session, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // one week
    });

    return res.json({
      status: "ok",
    });
  } catch (e) {
    next(e);
    return;
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("session");
  return res.json({
    status: "ok",
  });
});

export default router;
