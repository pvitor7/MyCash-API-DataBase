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
    user: string,
    balance: number
    
}