import { Router } from "express";
import createUserController from '../controllers/users/createUser.controller';
import loginUserController from '../controllers/users/loginUser.controller';
import { userSchema, userUpdateSchema } from '../schemas/user.schema';
import schemaValidation from '../middlewares/schemaValidation.middleware';
import retriveUserController from "../controllers/users/retriveUser.controller";
import { VerifyToken } from "../middlewares/VerifyToken.middleware";

const usersRoute = Router();
const loginRoute  = Router();

usersRoute.post("/register", schemaValidation(userSchema), createUserController);
usersRoute.get("/:id", VerifyToken, retriveUserController);
usersRoute.patch("/:id", VerifyToken, schemaValidation(userUpdateSchema), retriveUserController);
usersRoute.delete("/:id", VerifyToken, retriveUserController);
loginRoute.post("", schemaValidation(userSchema), loginUserController);

export {usersRoute, loginRoute};
