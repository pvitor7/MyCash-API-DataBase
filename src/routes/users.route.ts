import { Router } from "express";
import createUserController from '../controllers/users/createUser.controller';
import loginUserController from '../controllers/users/loginUser.controller';

const usersRoute = Router();

usersRoute.post("/register", createUserController);
usersRoute.post("/login", loginUserController);

export default usersRoute;