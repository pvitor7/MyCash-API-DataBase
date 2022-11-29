import { NextFunction, Request, Response } from 'express';

class UserController {

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, password } = req.body;
        // const userCreated = await createUserService({username, password});
        res.status(201).json(/*instanceToPlain(userCreated)*/{});
        return next();
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, password } = req.body;
        // const token = await LoginUserService({username, password});
        res.status(200).json({});
        return next();
    }
}

export default UserController;