import AppDataSource from '../../data-source';
import { Transactions } from '../../entities/transactions';
import { Accounts } from '../../entities/accounts';
import { IRequestTransaciton } from '../../interfaces/transaction';


const createTransactionService = async ({userId, debiteAccountId, creditAccountId, value}: IRequestTransaciton) => {

    const integerValue = value.toString().substring(0, (value.toString().length-2));
    const centsValue = value.toString().substring((value.toString().length-2));
    const valueTransaciton = Number(integerValue + "." + centsValue);
    
    const accountRepository = AppDataSource.getRepository(Accounts);
    
    const accountDebitExists = await accountRepository.findOne({where: {id: debiteAccountId}});

    if(!accountDebitExists){
        return "A conta para débito não existe";
    }

    if(accountDebitExists.balance <= valueTransaciton){
        return "Você não possui saldo suficiente para esta operação";
    }
    
    const accountCreditExists = await accountRepository.findOne({where: {id: creditAccountId}});
    
    if(!accountCreditExists){
        return "A conta para crédito não existe";
    }
    
    await accountRepository.update(debiteAccountId, {balance: Number(accountDebitExists.balance) - valueTransaciton});
    
    await accountRepository.update(creditAccountId, {balance: Number(accountCreditExists.balance) + valueTransaciton});
    
    const transactionRepository = AppDataSource.getRepository(Transactions);

    const newTransaction = new Transactions();
    newTransaction.debiteAccountId = accountDebitExists.id;
    newTransaction.creditAccountId = accountDebitExists.id;
    newTransaction.value = valueTransaciton;
    newTransaction.createdAt = new Date();
    
    transactionRepository.create(newTransaction);
    await transactionRepository.save(newTransaction);
    
    return newTransaction;
};

export default createTransactionService;