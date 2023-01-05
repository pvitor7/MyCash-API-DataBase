import { AppError } from './../../errors/AppError';
import { Transactions } from '../../entities/transactions';
import { IRequestTransaciton, ITransaciton } from '../../interfaces/transaction';
import UserRepository from '../../repositories/users.repository';
import AccountRepository from '../../repositories/accounts.repository';
import TransactionsRepository from '../../repositories/transactions.repository';

const createTransactionService = async ({userId, usernameAddressee, value}: IRequestTransaciton): Promise<ITransaciton> => {

    const integerValue = value.toString().substring(0, (value.toString().length-2));
    const centsValue = value.toString().substring((value.toString().length-2));
    const valueTransaciton = Number(integerValue + "." + centsValue);

    const user = await UserRepository.findOneById(userId);
    if(!user){ throw new AppError("Usuário não encontrado!", 404) }

    if(user.username === usernameAddressee){throw new AppError("A conta informada pertence ao titular!", 403)}

    const addressee = await UserRepository.findOneByName(usernameAddressee);
    if(!addressee){ throw new AppError("Destinatário não encontrado!", 404)}
    
    const accountDebitExists = await AccountRepository.findById(user.account.id);
    if(!accountDebitExists){ throw new AppError("A conta para débito não foi encontrada.", 404) }
    if(accountDebitExists.balance < valueTransaciton) { throw new AppError("Saldo insuficiente para transferência.", 406) }
    
    const accountCreditExists = await AccountRepository.findById(addressee.account.id);
    if(!accountCreditExists){throw new AppError("A conta para destino não foi encontrada.", 404)}
    
    await AccountRepository.update(user.account.id, Number(accountDebitExists.balance) - valueTransaciton);
    await AccountRepository.update(addressee.account.id, Number(accountCreditExists.balance) + valueTransaciton);
    
    const creditedUpdated = await AccountRepository.findById(addressee.account.id);
    const debitedUpdated = await AccountRepository.findById(user.account.id);

    const newTransaction = new Transactions();
    if(debitedUpdated && creditedUpdated){
        newTransaction.debitedAccountId = debitedUpdated;
        newTransaction.creditedAccountId = creditedUpdated;
        newTransaction.value = valueTransaciton;
        newTransaction.createdAt = new Date();
    }
    const newTransfer: Transactions = await TransactionsRepository.create(newTransaction);

    return {
        id: newTransfer.id, 
        createdAt: newTransfer.createdAt, 
        credited: usernameAddressee,
        debited: user.username, 
        value: newTransfer.value
    }
};

export default createTransactionService;