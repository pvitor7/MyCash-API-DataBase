import { Router } from "express";
import { VerifyToken } from '../middlewares/VerifyToken.middleware';
import retriveAccountController from '../controllers/accounts/retriveAccount.controller';

const accountRoute = Router();

accountRoute.get("", VerifyToken, retriveAccountController);

export default accountRoute;