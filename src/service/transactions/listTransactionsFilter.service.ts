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
  if (!type) {
    if (!day || !month || !age) {
      return "É necessário informar um tipo, ou data de transações para o filtro!";
    }
  }

  const userRepository = AppDataSource.getRepository(User);
  const userAccount = await userRepository.findOne({ where: { id: userId } });

  if (!userAccount) {
    return "O úsuário não foi encontrado!";
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

  if (type == "debited") {
    return listTransactions.map((transaction) => {
      if (transaction.debitedAccountId.id === userAccount.account.id) {
        return {
          id: transaction.id,
          value: transaction.value,
          date: transaction.createdAt,
          debitedAccount: transaction.debitedAccountId.id,
          creditedAccount: transaction.creditedAccountId.id,
        };
      }
    });
  }

  if (type == "credited") {
    return listTransactions.filter((transaction) => {
      console.log(transaction)
      if (transaction.creditedAccountId.id === userAccount.account.id)
        return {
          id: transaction.id,
          value: transaction.value,
          date: transaction.createdAt,
          debitedAccount: transaction.debitedAccountId.id,
          creditedAccount: transaction.creditedAccountId.id,
        };
    });
  }
};

export default listTransactionsFilterService;
