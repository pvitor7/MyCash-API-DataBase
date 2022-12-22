import { IUserCreateResponse } from './../../interfaces/user';
import { AppError } from './../../errors/AppError';
import { IUser } from '../../interfaces/user';
import { User } from '../../entities/users';
import { hash } from 'bcryptjs';
import { Accounts } from '../../entities/accounts';
import UserRepository from '../../repositories/users.repository';
import AccountRepository from '../../repositories/accounts.repository';

const createUserService = async ({username, password}: IUser): Promise<IUserCreateResponse> => {
    
    const usernameAlreadyExists: User|null = await UserRepository.findOneByName(username);

    if(usernameAlreadyExists){
        throw new AppError("O usuário já existe");
    }

    const account = new Accounts();
    account.balance = 100;
    await AccountRepository.create(account);

    const hashedPassword = await hash(password, 12);
    
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.account = account;

    const newUser = await UserRepository.create(user);

    return {id: newUser.id, user: newUser.username, balance: newUser.account.balance};
};

export default createUserService;