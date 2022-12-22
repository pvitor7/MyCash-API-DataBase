import { User } from "../entities/users";
import { IUser } from "./user";

export interface IUsersRepository {

    allUsers(): Promise<User[]>;
    
    create({username, password}: IUser): Promise<User>;
    
    findOneById(userId: string): Promise<User| null>;
    
    findOneByName(username: string): Promise<User| null>;
}