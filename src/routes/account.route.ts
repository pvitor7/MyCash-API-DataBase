import { Router } from "express";
import { VerifyToken } from '../middlewares/VerifyToken.middleware';
import createAccountController from '../controllers/accounts/createAccount.controller';
import retriveAccountController from '../controllers/accounts/retriveAccount.controller';

const accountRoute = Router();

accountRoute.post("/register", VerifyToken, createAccountController);
accountRoute.get("", VerifyToken, retriveAccountController);

export default accountRoute;