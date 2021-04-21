import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma";

// check for session cookie, if it exists add user information (except password) to request object
export default async function processSessionCookies(req: Request, res: Response, next: NextFunction) {
  if (req.cookies?.session) {
    const result = await prisma.user.findUnique({
      where: {
        session: req.cookies.session,
      },
    });

    if (result) {
      const { password, ...user } = result;
      req.user = user;

      // extend cookie expiration date by one week
      res.cookie("session", user.session, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // one week
      });
    }
  }
  return next();
}
