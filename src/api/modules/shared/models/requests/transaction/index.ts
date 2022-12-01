interface ITransacitonFilterRequest {
    userId: string;
    type?: string;
    day?: number;
    month?: number;
    age?: number;
}

interface IResponseTransaction {
    transferId: number;
    createdAt: string;
    value: string;
    debitedUser: string;
    creditedUser: string;
}

interface ITransaciton {
    debitedAccountId: string;
    creditedAccountId: string;
    value: number;
}

interface IRequestTransaciton {
    userId: string;
    usernameAddressee: string;
    value: number;
}

export {
    ITransacitonFilterRequest,
    IResponseTransaction,
    ITransaciton,
    IRequestTransaciton
}