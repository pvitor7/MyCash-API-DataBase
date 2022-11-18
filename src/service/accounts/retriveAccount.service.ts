import { Accounts } from '../../entities/accounts';
import { User } from '../../entities/users';
import AppDataSource from '../../data-source';

const retriveAccountService = async (userId: string) => {

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {
        id: userId
    }});

    if(!user){ return "Usuário não encontrado!"}
    
    const accountRepository = AppDataSource.getRepository(Accounts);
    const account = await accountRepository.findOne({where: {id: user.account.id}});

    return account;
} 

export default retriveAccountService;