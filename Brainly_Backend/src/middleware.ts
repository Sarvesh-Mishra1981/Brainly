import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Jwt_Key } from "./config.js";

export const auth = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "You are not logged In" });
  }
  try {
    const decoded = jwt.verify(token as string, Jwt_Key) as { id: string };
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ message: "Invalid token" });
  }
};
