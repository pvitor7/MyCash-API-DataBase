export interface ITransaciton{
    debiteAccountId: string;
    creditAccountId: string;
    value: number;
}

export interface IRequestTransaciton extends ITransaciton{
    userId?: string;
}
