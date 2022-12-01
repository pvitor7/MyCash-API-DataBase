import { Router } from "express";
import { schemaValidation } from "../shared/middlewares";
import { userSchema } from './validator/index';
import UserController from "./UserController";

const usersRoute = Router();
const controller = new UserController();

usersRoute.post("/register", schemaValidation(userSchema), controller.create);
usersRoute.post("/login", schemaValidation(userSchema), controller.login);

export default usersRoute;