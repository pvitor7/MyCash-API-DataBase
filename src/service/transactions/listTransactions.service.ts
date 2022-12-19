import { IResponseTransaction } from "./../../interfaces/transaction";
import { AppError } from "./../../errors/AppError";
import AppDataSource from "../../data-source";
import { Transactions } from "../../entities/transactions";
import { User } from "../../entities/users";
import { Accounts } from "../../entities/accounts";

const listTransactionsService = async (userId: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const userAccount = await userRepository.findOne({
    where: { id: userId },
  });

  if (!userAccount) {
    throw new AppError("Usuário não encontrado!", 404);
  }

  const transactionRepository = AppDataSource.getRepository(Transactions);
  const listTransactions = await transactionRepository.find({
    where: [{ debitedAccountId: userAccount.account }, { creditedAccountId: userAccount.account }],
  });

  if (listTransactions.length === 0) {
    throw new AppError("Esta conta ainda não envio nem recebeu transfências.", 404);
  }

  const users = await userRepository.find();
  const listTransferUser = listTransactions.map((transfer) => {
    return { id: transfer.id, createdAt: transfer.createdAt,
      debited: users.find((user: any) => user.account.id === transfer.debitedAccountId.id)?.username,
      credited: users.find((user: any) => user.account.id === transfer.creditedAccountId.id)?.username,
      value: transfer.value};
  });

  return listTransferUser;
};

export default listTransactionsService;
