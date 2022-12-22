import { AppError } from './../../errors/AppError';
import { IUser } from '../../interfaces/user';
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken";
import AppDataSource from '../../data-source';
import { User } from '../../entities/users';
import UserRepository from '../../repositories/users.repository';

const LoginUserService = async ({username, password}: IUser): Promise<string> => {

    const usernameExists = await UserRepository.findOneByName(username);

    if (!usernameExists){
        throw new AppError("Usuário ou senha incorretos.", 400);
    }

    const passwordVerify = await compare(password, usernameExists.password);

    if (!passwordVerify){
        throw new AppError("Usuário ou senha incorretos.", 400)
    }

    const token = jwt.sign({
        id: usernameExists.id
    }, process.env.SECRET_KEY as string, {
        expiresIn: "24h"
    })

    return token;
}

export default LoginUserService;