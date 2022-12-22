import AppDataSource from "../data-source";
import { Accounts } from "../entities/accounts";
import { INewAccount } from "../interfaces/accounts";

class AccountRepository {

    static AccountsRepo = AppDataSource.getRepository(Accounts);

    static async find(){
        return await this.AccountsRepo.find();
    }

    static async findById(id: string){
        return await this.AccountsRepo.findOneBy({id});
    }

    static async update(id: string, balance: number){
        return await this.AccountsRepo.update(id, {balance: balance})
    }

    static async create(newAccount: INewAccount){
        this.AccountsRepo.create(newAccount);
        return await this.AccountsRepo.save(newAccount);
    }
}

export default AccountRepository;