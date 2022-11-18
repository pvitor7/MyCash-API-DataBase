import { Accounts } from '../entities/accounts';

export interface ITransaciton{
    debitedAccountId: string;
    creditedAccountId: string;
    value: number;
}

export interface IRequestTransaciton{
    userId: string;
    usernameAddressee: string;
    value: number;
}
