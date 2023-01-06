import { Accounts } from "../entities/accounts";
import { User } from "../entities/users";

export interface ITransaciton{
    id: string;
    createdAt: Date;
    value: number;
    debited: string;
    credited: string;
}

export interface IRequestTransaciton{
    userId: string;
    usernameAddressee: string;
    value: number;
}

export interface ITransacitonFilterRequest{
    userId: string;
    type?: string;
    day?: string;
    month?: string;
    year?: string;
}

export interface ITransactionObject{
    id: string,
    createdAt: Date,
    credited: User,
    debited: User,
    value: number,
}