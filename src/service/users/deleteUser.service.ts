import { AppError } from "../../errors/AppError";
import AccountRepository from "../../repositories/accounts.repository";
import UserRepository  from "../../repositories/users.repository";

const deleteUserService = async (id: string, userId: string) => {

    if(id != userId){
        throw new AppError("Usuário não autorizado!", 403);
    }

    const user = await UserRepository.findOneById(id);
    if(!user){ 
        throw new AppError("Usuário não encontrado!", 404)
    }
    
    const account = await AccountRepository.findById(user.account.id);
    if(!account){
        await UserRepository.delete(id); 

    }else if(account?.balance > 0){
        throw new AppError("O usuário ainda possui saldo em sua conta.", 403);
    };
    
    return null;
}

export default deleteUserService;