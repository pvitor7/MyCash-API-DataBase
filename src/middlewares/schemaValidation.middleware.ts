import { Request, Response, NextFunction } from "express";

const schemaValidation = (schema: any) => async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const validated: any = await schema.validate(req.body);
        req.body = validated;
        next();

    }catch(error: any){
        return res.status(400).json({message: error.errors.join(',')});
    }
}

export default schemaValidation;