import { Router } from "express";
import createTransactionController from '../controllers/transactions/createTransaction.controller';
import listTransactionsController from '../controllers/transactions/listTransactions.controller';
import listTransactionsFilterController from '../controllers/transactions/listTransactionsFilter.controller';
import { VerifyToken } from '../middlewares/VerifyToken.middleware';
import transactionSchema from '../schemas/transaction.schema';
import schemaValidation from '../middlewares/schemaValidation.middleware';

const transactionRoute = Router();

transactionRoute.post("", VerifyToken, schemaValidation(transactionSchema), createTransactionController);
transactionRoute.get("/", VerifyToken, listTransactionsController);
transactionRoute.post("/category", VerifyToken, listTransactionsFilterController);
transactionRoute.get("/category/:type?", VerifyToken, listTransactionsFilterController);

export default transactionRoute;