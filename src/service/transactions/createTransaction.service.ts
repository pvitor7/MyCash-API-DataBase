import AppDataSource from '../../data-source';
import { Transactions } from '../../entities/transactions';
import { Accounts } from '../../entities/accounts';
import { IRequestTransaciton } from '../../interfaces/transaction';


const createTransactionService = async ({userId, debitedAccountId, creditedAccountId, value}: IRequestTransaciton) => {

    const integerValue = value.toString().substring(0, (value.toString().length-2));
    const centsValue = value.toString().substring((value.toString().length-2));
    const valueTransaciton = Number(integerValue + "." + centsValue);
    
    const accountRepository = AppDataSource.getRepository(Accounts);
    
    const accountDebitExists = await accountRepository.findOne({where: {id: debitedAccountId}});

    if(!accountDebitExists){ return "A conta para débito não existe" }

    if(accountDebitExists.balance <= valueTransaciton) { return "Você não possui saldo suficiente para esta operação" }
    
    const accountCreditExists = await accountRepository.findOne({where: {id: creditedAccountId}});
    
    if(!accountCreditExists){return "A conta para crédito não existe"}
    
    await accountRepository.update(debitedAccountId, {balance: Number(accountDebitExists.balance) - valueTransaciton});
    await accountRepository.update(creditedAccountId, {balance: Number(accountCreditExists.balance) + valueTransaciton});
    
    const transactionRepository = AppDataSource.getRepository(Transactions);

    const creditedUpdated = await accountRepository.findOne({where: {id: creditedAccountId}});
    const debitedUpdated = await accountRepository.findOne({where: {id: debitedAccountId}});

    const newTransaction = new Transactions();
    
    if(debitedUpdated && creditedUpdated){
        newTransaction.debitedAccountId = debitedUpdated;
        newTransaction.creditedAccountId = creditedUpdated;
        newTransaction.value = valueTransaciton;
        newTransaction.createdAt = new Date();
    }
    
    transactionRepository.create(newTransaction);
    await transactionRepository.save(newTransaction);
    
    return {transferId: newTransaction.id, createdAt: newTransaction.createdAt, value: newTransaction.value, debitedAccount: newTransaction.debitedAccountId.id, creditedAccount: newTransaction.creditedAccountId.id};
};

export default createTransactionService;