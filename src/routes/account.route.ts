import { Router } from "express";
import createAccountController from '../controllers/accounts/createAccount.controller';


const accountRoute = Router();

accountRoute.post("/register", createAccountController);

export default accountRoute;