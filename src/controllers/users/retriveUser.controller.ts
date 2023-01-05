import { Request, Response } from "express"
import retriveUserService from "../../service/users/retriveUser.service"

const retriveUserController = async (req: Request, res: Response) => {
    const { id } = req.params 
    const userId = req.user.id
    const user = await retriveUserService(id, userId);
    return res.status(200).json(user);
}

export default retriveUserController;