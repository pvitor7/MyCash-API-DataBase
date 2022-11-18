import AppDataSource from '../../data-source';
import { Transactions } from '../../entities/transactions';
import { Accounts } from '../../entities/accounts';
import { User } from '../../entities/users';
import { IRequestTransaciton } from '../../interfaces/transaction';


const createTransactionService = async ({userId, usernameAddressee, value}: IRequestTransaciton) => {

    const integerValue = value.toString().substring(0, (value.toString().length-2));
    const centsValue = value.toString().substring((value.toString().length-2));
    const valueTransaciton = Number(integerValue + "." + centsValue);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({where: {
        id: userId
    }});

    if(!user){ return "Usuário não encontrado!"}

    if(user.username === usernameAddressee){return "A conta informada pertence ao titular!"}

    const addressee = await userRepository.findOne({where: {
        username: usernameAddressee
    }});

    if(!addressee){ return "Destinatário não encontrado!"}

    
    const accountRepository = AppDataSource.getRepository(Accounts);
    const accountDebitExists = await accountRepository.findOne({where: {id: user.account.id}});
    if(!accountDebitExists){ return "A conta para débito não existe" }
    if(accountDebitExists.balance <= valueTransaciton) { return "Você não possui saldo suficiente para esta operação" }
    
    const accountCreditExists = await accountRepository.findOne({where: {id: addressee.account.id}});
    if(!accountCreditExists){return "A conta para crédito não existe"}
    
    await accountRepository.update(user.account.id, {balance: Number(accountDebitExists.balance) - valueTransaciton});
    await accountRepository.update(addressee.account.id, {balance: Number(accountCreditExists.balance) + valueTransaciton});
    
    const transactionRepository = AppDataSource.getRepository(Transactions);
    const creditedUpdated = await accountRepository.findOne({where: {id: addressee.account.id}});
    const debitedUpdated = await accountRepository.findOne({where: {id: user.account.id}});

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