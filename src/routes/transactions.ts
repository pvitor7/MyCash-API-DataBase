import { Router } from "express";
import createTransactionController from '../controllers/transactions/createTransactionController';
import { VerifyToken } from '../middlewares/VerifyToken.middleware';

const transactionRoute = Router();

transactionRoute.post("", VerifyToken, createTransactionController);

export default transactionRoute;