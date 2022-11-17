import { Router } from "express";
import createTransactionController from '../controllers/transactions/createTransactionController';
import { VerifyToken } from '../middlewares/VerifyToken.middleware';
import transactionSchema from '../schemas/transaction.schema';
import schemaValidation from '../middlewares/schemaValidation.middleware';


const transactionRoute = Router();

transactionRoute.post("", VerifyToken, schemaValidation(transactionSchema), createTransactionController);

export default transactionRoute;