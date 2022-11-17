import { Router } from "express";
import createTransactionController from '../controllers/transactions/createTransaction.controller';
import listTransactionsController from '../controllers/transactions/listTransactions.controller';
import { VerifyToken } from '../middlewares/VerifyToken.middleware';
import transactionSchema from '../schemas/transaction.schema';
import schemaValidation from '../middlewares/schemaValidation.middleware';

const transactionRoute = Router();

transactionRoute.post("", VerifyToken, schemaValidation(transactionSchema), createTransactionController);
transactionRoute.get("", VerifyToken, listTransactionsController);

export default transactionRoute;