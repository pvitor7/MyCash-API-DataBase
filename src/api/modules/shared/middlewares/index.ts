import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken";

import { AppError } from '../AppError';

const handleAppErrorMiddleware = async (error: Error, req: Request, res: Response, _:NextFunction) => {

    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        })
    }

    return res.status(500).json({
        message: "Internal server error"
    })
}

const schemaValidation = (schema: any) => async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const validated: any = await schema.validate(req.body);
        req.body = validated;
        next();

    }catch(error: any){
        return res.status(400).json({message: error.errors.join(',')});
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {

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

export { 
    handleAppErrorMiddleware,
    schemaValidation,
    verifyToken
}