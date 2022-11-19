export interface IUser{
    username: string;
    password: string;
}

interface IUserCreateAccountResponse{
    id: string;
    balance: number;
}


export interface IUserCreateResponse{
    
    id: string,
    username: string,
    account: IUserCreateAccountResponse
    
}