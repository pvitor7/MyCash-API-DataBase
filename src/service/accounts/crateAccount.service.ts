import { Accounts } from '../../entities/accounts';
import AppDataSource from '../../data-source';

const createAccountService = async () => {

    const accountRepository = AppDataSource.getRepository(Accounts);

    const account = new Accounts();
    account.balance = 100;

    accountRepository.create(account);
    await accountRepository.save(account);

    return account;
} 

export default createAccountService;