import { IUser } from '../../interfaces/user';
import { User } from '../../entities/users';
import AppDataSource from '../../data-source';
import { hash } from 'bcryptjs';

const createUserService = async ({username, password}: IUser) => {
    
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    const usernameAlreadyExists = users.find(user => user.username === username);

    if (usernameAlreadyExists){
        return "O usuário já existe"
    }

    const hashedPassword = await hash(password, 12);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;

    userRepository.create(user);
    await userRepository.save(user);

    return user;

};

export default createUserService;