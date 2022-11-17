import AppDataSource from '../../data-source';
import { Transactions } from '../../entities/transactions';
import { User } from '../../entities/users';
import { Accounts } from '../../entities/accounts';

const listTransactionsService = async (userId: string) => {

    const userRepository = AppDataSource.getRepository(User);
    const userAccount = await userRepository.findOne({where: {
        id: userId
    }});

    if(!userAccount){return "O úsuário não foi encontrado!"}
    
    const transactionRepository = AppDataSource.getRepository(Transactions);
    const listTransactions = await transactionRepository.find({where: [{debitedAccountId: userAccount.account }, {creditedAccountId: userAccount.account}]});

    if(listTransactions.length === 0) {
        return "Esta conta ainda não envio nem recebeu transfências."
    }

    return listTransactions;
};

export default listTransactionsService;