import { AppError } from "./../../errors/AppError";
import { ITransaciton, ITransacitonFilterRequest, ITransactionObject } from "./../../interfaces/transaction";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users";
import TransactionsRepository from "../../repositories/transactions.repository";

const listTransactionsFilterService = async ({userId, day, month, year, type}: ITransacitonFilterRequest): Promise<ITransaciton[] | undefined> => {

  const userRepository = AppDataSource.getRepository(User);
  const userAccount = await userRepository.findOne({ where: { id: userId } });

  if (!userAccount) {
    throw new AppError("Usuário não encontrado!", 404);
  }

  const listTransactions = await TransactionsRepository.find();
  const users = await userRepository.find();

  const listTransferUser = listTransactions.map((transfer) => {
    const creditedUser = users.find((user) => user.account.id === transfer.creditedAccountId.id);
    const debitedUser = users.find((user) => user.account.id === transfer.debitedAccountId.id);
    return {
      id: transfer.id,
      createdAt: transfer.createdAt,
      credited: creditedUser,
      debited: debitedUser,
      value: transfer.value,
    };
  });

  let listReturn: ITransaciton[] = [];

  if (day && month && year) {
    if (new Date() < new Date(year, month - 1, day)) {
      throw new AppError(
        "A data informada não pode ser maior do que a atual!",
        400
      );
    }

    listTransferUser.forEach((transaction) => {
      if (
        year == transaction.createdAt.getFullYear() &&
        month == transaction.createdAt.getMonth() + 1 &&
        day == transaction.createdAt.getDate()
      ) {
        return (listReturn = [
          ...listReturn,
          {
            id: transaction.id,
            createdAt: transaction.createdAt,
            credited: transaction.credited?.username || "",
            debited: transaction.debited?.username || "",
            value: transaction.value
          },
        ]);
      }
    });
    return listReturn;
  }

  if (type == "cash-out") {
    listTransferUser.forEach((transaction) => {
      if (transaction.debited?.id === userAccount.id) {
        listReturn = [
          ...listReturn,
          {
            id: transaction.id,
            createdAt: transaction.createdAt,
            credited: transaction.credited?.username || "",
            debited: transaction.debited?.username || "",
            value: transaction.value
          },
        ];
      }
    });
    return listReturn;
  }

  if (type == "cash-in") {
    listTransferUser.forEach((transaction) => {
      if (transaction.credited?.id === userAccount.id) {
        listReturn = [
          ...listReturn,
          {
            id: transaction.id,
            createdAt: transaction.createdAt,
            credited: transaction.credited?.username || "",
            debited: transaction.debited?.username || "",
            value: transaction.value
          },
        ];
      }
    });

    return listReturn;
  }
};

export default listTransactionsFilterService;
