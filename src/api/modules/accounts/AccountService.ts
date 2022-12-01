import AppDataSource from "../../../db/data-source";
import { AppError } from "../shared/AppError";
import { Account } from '../../../entities/Account';
import { User } from '../../../entities/User';

class AccountService {

    public async retrieve(userId: string): Promise<any> {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {
            id: userId
        }});
    
        if(!user){ 
            throw new AppError("Usuário não encontrado!", 404)
        }
        
        const accountRepository = AppDataSource.getRepository(Account);

        return accountRepository.findOne({where: {id: user.account.id}});
    }
}

export default AccountService;