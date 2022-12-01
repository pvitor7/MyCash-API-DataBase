import { IUserCreateAccountResponse } from "../account"

interface IUserCreateResponse{
    id: string,
    username: string,
    account: IUserCreateAccountResponse    
}

export {
    IUserCreateResponse
}