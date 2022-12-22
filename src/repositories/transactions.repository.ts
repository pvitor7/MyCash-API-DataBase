import AppDataSource from "../data-source";
import { Accounts } from "../entities/accounts";
import { Transactions } from "../entities/transactions";

class TransactionsRepository{
    
    static TransactionsRepo = AppDataSource.getRepository(Transactions);
    
    static async find(){
        return await this.TransactionsRepo.find();
    }

    static async create(transaction: Transactions){
        this.TransactionsRepo.create(transaction);
        return await this.TransactionsRepo.save(transaction);
    }


    static async findById(id: string){
        return await this.TransactionsRepo.findOneBy({id});
    }

    static async findByDebit(account: Accounts){
        return await this.TransactionsRepo.findBy({debitedAccountId: account});
    }

    static async findByCreditedId(account: Accounts){
        return await this.TransactionsRepo.findBy({creditedAccountId: account});
    }
}

export default TransactionsRepository;