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


  const users = await userRepository.find();
  const listTransferUser = listTransactions.map((transfer) => {
    return {
      id: transfer.id,
      createdAt: transfer.createdAt,
      debited: users.find(
        (user: any) => user.account.id === transfer.debitedAccountId.id
      )?.username,
      credited: users.find(
        (user: any) => user.account.id === transfer.creditedAccountId.id
      )?.username,
      value: transfer.value,
    };
  });

  if (day && month && age) {
    return listTransferUser.filter(
      (transaction) =>
        age == transaction.createdAt.getFullYear() &&
        month == transaction.createdAt.getMonth() + 1 &&
        day == transaction.createdAt.getDate()
    );
  }

  let listReturn: any = []; 

  if (type == "cash-out") {
    listTransactions.map((transaction) => {
      if(transaction.debitedAccountId.id === userAccount.account.id){
        return listReturn = [...listReturn, {id: transaction.id, createdAt: transaction.createdAt,
          debited: users.find((user: any) => user.account.id === transaction.debitedAccountId.id)?.username,
          credited: users.find((user: any) => user.account.id === transaction.creditedAccountId.id)?.username,
          value: transaction.value}]    
        }
    })
    return listReturn;
  }

  if (type == "cash-in") {
    listTransactions.map((transaction) => {
      if(transaction.creditedAccountId.id === userAccount.account.id){
        return listReturn = [...listReturn,  { id: transaction.id, createdAt: transaction.createdAt,
        debited: users.find((user: any) => user.account.id === transaction.debitedAccountId.id)?.username,
        credited: users.find((user: any) => user.account.id === transaction.creditedAccountId.id)?.username,
        value: transaction.value}]   
    
      }
    })
  return listReturn;
}
    
};

export default listTransactionsFilterService;
