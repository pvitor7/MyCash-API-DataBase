import { INewAccount } from "./accounts";

export interface IUser{
    username: string;
    password: string;
}

export interface IUserCreateResponse{
    id: string,
    user: string,
    balance: number
}


export interface INewUser{
    username: string,
    password: string,
    account: INewAccount
}