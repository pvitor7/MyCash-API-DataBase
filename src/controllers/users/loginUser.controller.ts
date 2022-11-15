import { Request, Response } from 'express';
import createUserService from '../../service/users/createUser.service';
import LoginUserService from '../../service/users/loginUser.service';

const loginUserController = async (req: Request, res: Response) => {

    const { username, password } = req.body;

    const token = await LoginUserService({username, password});

    return res.status(200).json(token);
}

export default loginUserController;