import { AppError } from './../../errors/AppError';
import { ITransacitonFilterRequest } from "./../../interfaces/transaction";
import AppDataSource from "../../data-source";
import { Transactions } from "../../entities/transactions";
import { User } from "../../entities/users";
import { Accounts } from "../../entities/accounts";
import { Raw } from "typeorm";

const listTransactionsFilterService = async ({
  userId,
  day,
  month,
  age,
  type,
}: ITransacitonFilterRequest) => {
  
  const userRepository = AppDataSource.getRepository(User);
  const userAccount = await userRepository.findOne({ where: { id: userId } });

  if (!userAccount) {
    throw new AppError("Usuário não encontrado!", 404)
  }

  const transactionRepository = AppDataSource.getRepository(Transactions);
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
    
};

export default listTransactionsFilterService;
