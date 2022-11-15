import { Router } from "express";
import createTransactionController from '../controllers/transactions/createTransactionController';

const transactionRoute = Router();

transactionRoute.post("/register", createTransactionController);

export default transactionRoute;