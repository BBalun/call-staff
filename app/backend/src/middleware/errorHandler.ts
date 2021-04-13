import { Request, Response, NextFunction } from "express";

export async function errorHandler(_err: any, _req: Request, res: Response, _next: NextFunction) {
  return res.status(500).json({
    status: "error",
    msg: "oops, something went wrong",
  });
}
