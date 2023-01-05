import UserRepository  from "../../repositories/users.repository";

const retriveUserService = async (id: string, userId: string) => {

    console.log(id, userId);

    return await UserRepository.findOneById(id);

}

export default retriveUserService;