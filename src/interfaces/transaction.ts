export interface ITransaciton{
    debiteAccountId: string;
    creditAccountId: string;
    value: number;
}

export interface IRequestTransaciton{
    userId: string;
    debiteAccountId: string;
    creditAccountId: string;
    value: number;
}
