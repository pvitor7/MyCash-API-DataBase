import AppDataSource from "../../../db/data-source";
import { Account } from "../../../entities/Account";
import { User } from "../../../entities/User";
import { AppError } from "../shared/AppError";
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken";

class UserService {

    public async create({ username, password }: IUser): Promise<IUserCreateResponse> {
    
        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
    
        const usernameAlreadyExists = users.find(user => user.username === username);
    
        if (usernameAlreadyExists){
            throw new AppError("O usuário já existe")
        }
    
        const accountRepository = AppDataSource.getRepository(Account);
        const account = new Account();
        account.balance = 100;
        accountRepository.create(account);
        await accountRepository.save(account);
    
        const hashedPassword = await hash(password, 12);
        
        const user = new User();
        user.username = username;
        user.password = hashedPassword;
        user.account = account;
    
        userRepository.create(user);
        await userRepository.save(user);
    
        return user;
    
    }

    public async login({username, password}: IUser): Promise<string> {

        const userRepository = AppDataSource.getRepository(User);
        const users = await userRepository.find();
    
        const usernameExists = users.find(user => user.username === username);
    
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
}

export default UserService;