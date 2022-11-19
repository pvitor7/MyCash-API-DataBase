import { Request, Response } from 'express';
import createUserService from '../../service/users/createUser.service';
import { instanceToPlain } from "class-transformer";

const createUserController = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userCreated = await createUserService({username, password});

    return res.status(201).json(instanceToPlain(userCreated));
}

export default createUserController;