import { AppError } from './../../errors/AppError';
import { IUser } from '../../interfaces/user';
import { User } from '../../entities/users';
import AppDataSource from '../../data-source';
import { hash } from 'bcryptjs';
import { Accounts } from '../../entities/accounts';

const createUserService = async ({username, password}: IUser) => {
    
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const usernameAlreadyExists = users.find(user => user.username === username);

    if (usernameAlreadyExists){
        throw new AppError("O usuário já existe.", 400)
    }

    const accountRepository = AppDataSource.getRepository(Accounts);
    const account = new Accounts();
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

};

export default createUserService;