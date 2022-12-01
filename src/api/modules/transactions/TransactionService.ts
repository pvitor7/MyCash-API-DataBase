import { Account } from "../../../entities/Account";
import { AppError } from "../shared/AppError";
import { Transaction } from "../../../entities/Transaction";
import { User } from "../../../entities/User";
import AppDataSource from "../../../db/data-source";
import { IRequestTransaciton, ITransacitonFilterRequest } from "../shared/models/requests/transaction";

class TransactionService {

    public async create({ userId, usernameAddressee, value }: IRequestTransaciton): Promise<any> {

        const integerValue = value.toString().substring(0, (value.toString().length - 2));
        const centsValue = value.toString().substring((value.toString().length - 2));
        const valueTransaciton = Number(integerValue + "." + centsValue);

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({
            where: {
                id: userId
            }
        });

        if (!user) { throw new AppError("Usuário não encontrado!", 404) }

        if (user.username === usernameAddressee) { throw new AppError("A conta informada pertence ao titular!", 403) }

        const addressee = await userRepository.findOne({
            where: {
                username: usernameAddressee
            }
        });

        if (!addressee) { throw new AppError("Destinatário não encontrado!", 404) }


        const accountRepository = AppDataSource.getRepository(Account);
        const accountDebitExists = await accountRepository.findOne({ where: { id: user.account.id } });
        if (!accountDebitExists) { throw new AppError("A conta para débito não foi encontrada.", 404) }
        if (accountDebitExists.balance <= valueTransaciton) { throw new AppError("Saldo insuficiente para transferência.", 406) }

        const accountCreditExists = await accountRepository.findOne({ where: { id: addressee.account.id } });
        if (!accountCreditExists) { throw new AppError("A conta para destino não foi encontrada.", 404) }

        await accountRepository.update(user.account.id, { balance: Number(accountDebitExists.balance) - valueTransaciton });
        await accountRepository.update(addressee.account.id, { balance: Number(accountCreditExists.balance) + valueTransaciton });

        const transactionRepository = AppDataSource.getRepository(Transaction);
        const creditedUpdated = await accountRepository.findOne({ where: { id: addressee.account.id } });
        const debitedUpdated = await accountRepository.findOne({ where: { id: user.account.id } });

        const newTransaction = new Transaction();

        if (debitedUpdated && creditedUpdated) {
            newTransaction.debitedAccountId = debitedUpdated;
            newTransaction.creditedAccountId = creditedUpdated;
            newTransaction.value = valueTransaciton;
            newTransaction.createdAt = new Date();
        }

        transactionRepository.create(newTransaction);
        await transactionRepository.save(newTransaction);

        return {
            transferId: newTransaction.id,
            createdAt: newTransaction.createdAt.toString(),
            value: newTransaction.value,
            debitedUser: user.username,
            creditedUser: usernameAddressee
        };
    }

    public async list(userId: string): Promise<any> {
        const userRepository = AppDataSource.getRepository(User);
        const userAccount = await userRepository.findOne({
          where: {
            id: userId,
          },
        });
      
        if (!userAccount) {
          throw new AppError("Usuário não encontrado!", 404)
        }
      
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const listTransactions = await transactionRepository.find({
          where: [
            { debitedAccountId: userAccount.account },
            { creditedAccountId: userAccount.account },
          ],
        });
      
        if (listTransactions.length === 0) {
          throw new AppError("Esta conta ainda não envio nem recebeu transfências.", 404);
        }
      
        return listTransactions;
    }

    public async listBy({
        userId,
        day,
        month,
        age,
        type,
      }: ITransacitonFilterRequest): Promise<any> {
        
        const userRepository = AppDataSource.getRepository(User);
        const userAccount = await userRepository.findOne({ where: { id: userId } });
      
        if (!userAccount) {
          throw new AppError("Usuário não encontrado!", 404)
        }
      
        const transactionRepository = AppDataSource.getRepository(Transaction);
        const listTransactions = await transactionRepository.find();
      
        if (day && month && age) {
          return listTransactions.filter(
            (transaction) =>
              age == transaction.createdAt.getFullYear() &&
              month == transaction.createdAt.getMonth() + 1 &&
              day == transaction.createdAt.getDate()
          );
        }
      
        if (type == "cash-out") {
          return listTransactions.filter((transaction) => transaction.debitedAccountId.id === userAccount.account.id)
        }
      
        if (type == "cash-in") {return listTransactions.filter((transaction) => transaction.creditedAccountId.id === userAccount.account.id)}
          
    }
}

export default TransactionService;