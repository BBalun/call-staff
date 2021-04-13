import { Request, Response, NextFunction } from "express";

// login required middleware (checks wheter user is logged in)
export default function loginRequired(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      msg: "you need to login first",
    });
  }
  return next();
}
