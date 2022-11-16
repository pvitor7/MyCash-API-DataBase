import AppDataSource from '../../data-source';
import { Transactions } from '../../entities/transactions';
import { Accounts } from '../../entities/accounts';
import { IRequestTransaciton } from '../../interfaces/transaction';


const createTransactionService = async ({userId, debiteAccountId, creditAccountId, value}: IRequestTransaciton) => {
    
    const accountRepository = AppDataSource.getRepository(Accounts);
    
    const accountDebitExists = await accountRepository.findOne({where: {id: debiteAccountId}});

    if(!accountDebitExists){
        return "A conta para débito não existe";
    }

    if(accountDebitExists.balance <= value){
        return "Você não possui saldo suficiente para esta operação";
    }
    
    const accountCreditExists = await accountRepository.findOne({where: {id: creditAccountId}});
    
    if(!accountCreditExists){
        return "A conta para crédito não existe";
    }
    
    await accountRepository.update(debiteAccountId, {balance: Number(accountDebitExists.balance) - value});
    
    await accountRepository.update(creditAccountId, {balance: Number(accountCreditExists.balance) + value});
    
    console.log(value, accountDebitExists, accountCreditExists);
    console.log(Number(accountCreditExists.balance) + value) 
    console.log(Number(accountDebitExists.balance) - value)
        
    const transactionRepository = AppDataSource.getRepository(Transactions);

    const newTransaction = new Transactions();
    newTransaction.debiteAccountId = accountDebitExists.id;
    newTransaction.creditAccountId = accountDebitExists.id;
    newTransaction.value = value;
    newTransaction.createdAt = new Date();
    
    transactionRepository.create(newTransaction);
    await transactionRepository.save(newTransaction);
    
    return newTransaction;
};

export default createTransactionService;