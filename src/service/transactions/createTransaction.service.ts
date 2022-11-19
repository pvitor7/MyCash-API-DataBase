import { IResponseTransaction } from './../../interfaces/transaction';
import { AppError } from './../../errors/AppError';
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

    if(!user){ throw new AppError("Usuário não encontrado!", 404) }

    if(user.username === usernameAddressee){throw new AppError("A conta informada pertence ao titular!", 403)}

    const addressee = await userRepository.findOne({where: {
        username: usernameAddressee
    }});

    if(!addressee){ throw new AppError("Destinatário não encontrado!", 404)}

    
    const accountRepository = AppDataSource.getRepository(Accounts);
    const accountDebitExists = await accountRepository.findOne({where: {id: user.account.id}});
    if(!accountDebitExists){ throw new AppError("A conta para débito não foi encontrada.", 404) }
    if(accountDebitExists.balance <= valueTransaciton) { throw new AppError("Saldo insuficiente para transferência.", 406) }
    
    const accountCreditExists = await accountRepository.findOne({where: {id: addressee.account.id}});
    if(!accountCreditExists){throw new AppError("A conta para destino não foi encontrada.", 404)}
    
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
    
    return {transferId: newTransaction.id, createdAt: newTransaction.createdAt.toString(), value: newTransaction.value, debitedUser: user.username, creditedUser: usernameAddressee};
};

export default createTransactionService;