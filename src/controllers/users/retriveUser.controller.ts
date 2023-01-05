import { Request, Response } from "express";
import retriveUserService from "../../service/users/retriveUser.service";
import { instanceToPlain } from "class-transformer";
import deleteUserService from "../../service/users/deleteUser.service";
import updatedUserService from "../../service/users/updatedUser.service";

const retriveUserController = async (req: Request, res: Response) => {
  
  const { id } = req.params;
  const userId = req.user.id;

  if (req.method == "GET") {
    const user = await retriveUserService(id, userId);
    return res.status(200).json(instanceToPlain(user));
  }

  if(req.method == "PATCH"){
    const password = req.body.password;
    const userUpdated = await updatedUserService(id, userId, password);
    return res.status(200).json({message: userUpdated});
  }

  if (req.method == "DELETE") {
    const userDeleted = await deleteUserService(id, userId);
    return res.status(204).send(null);
  }
};

export default retriveUserController;
