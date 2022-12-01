import { instanceToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import UserService from './UserService';

class UserController {

    private service: UserService;

    constructor() {
        this.service = new UserService();
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, password } = req.body;
        const userCreated = await this.service.create({username, password});
        res.status(201).json(instanceToPlain(userCreated));
        return next();
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, password } = req.body;
        const token = await this.service.login({username, password});
        res.status(200).json(token);
        return next();
    }
}

export default UserController;