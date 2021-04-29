import { Request, Response, NextFunction } from "express";

// login required middleware (checks wheter user is logged in)
export default function adminOnly(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({
      status: "error",
      msg: "login required",
    });
  }

  if (req.user.role.name !== "admin") {
    return res.status(401).json({
      status: "error",
      msg: "admin only",
    });
  }

  return next();
}
