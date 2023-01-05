import { AppError } from "../../errors/AppError";
import UserRepository  from "../../repositories/users.repository";

const retriveUserService = async (id: string, userId: string) => {

    if(id != userId){
        throw new AppError("Usuário não autorizado!", 403);
    }

    return await UserRepository.findOneById(id);
}

export default retriveUserService;