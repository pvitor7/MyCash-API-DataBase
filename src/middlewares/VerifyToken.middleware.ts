import "dotenv/config"
import { Request, NextFunction, Response } from 'express';
import jwt from "jsonwebtoken";

export const VerifyToken = (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const splitToken = token.split(" ")[1];

  jwt.verify(splitToken, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
      
    if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.user = { id: decoded.id };

      next();
    }
  );
};
