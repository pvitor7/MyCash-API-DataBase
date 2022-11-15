import { IUser } from '../../interfaces/user';
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken";
import AppDataSource from '../../data-source';
import { User } from '../../entities/users';

const LoginUserService = async ({username, password}: IUser) => {

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const usernameExists = users.find(user => user.username === username);

    if (!usernameExists){
        return "Usuário ou senha incorretos"
    }

    const passwordVerify = await compare(password, usernameExists.password);

    if (!passwordVerify){
        return "Usuário ou senha incorretos"
    }

    const token = jwt.sign({
        id: usernameExists.id
    }, process.env.SECRET_KEY as string, {
        expiresIn: "24h"
    })

    return token;

}

export default LoginUserService;