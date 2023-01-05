import AppDataSource from "../data-source";
import { Accounts } from "../entities/accounts";
import { User } from "../entities/users";
import { IUser } from "../interfaces/user";

class UserRepository {

  static UsersRepo = AppDataSource.getRepository(User);
    
  static allUsers(){
    return this.UsersRepo.find();
  }

  static create(newuser: IUser): Promise<User>{
      this.UsersRepo.create(newuser);
      return this.UsersRepo.save(newuser);
  }

  static findOneById(userId: string):Promise<User|null>{
    return this.UsersRepo.findOneBy({id: userId});
  }

  static findOneByName(username: string):Promise<User | null>{
    return this.UsersRepo.findOneBy({username: username});
  }

  static findOneByAccount(account: Accounts):Promise<User | null>{
    return this.UsersRepo.findOneBy({account: account});
  }

  static async delete(id: string){
    return await this.UsersRepo.delete(id);
  }

  static async update(id: string, password: string){
      return await this.UsersRepo.update(id, {password: password})
  }
}

export default UserRepository;