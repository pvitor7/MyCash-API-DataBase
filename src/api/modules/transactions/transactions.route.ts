import { Router } from "express";
import { verifyToken } from "../shared/middlewares";
import TransactionController from "./TransactionController";
// import schemaValidation from '../middlewares/schemaValidation.middleware';

const router = Router();
const controller = new TransactionController();

router.post("", verifyToken, /* schemaValidation(transactionSchema), */ controller.create);
router.get("/", verifyToken, controller.list);
router.post("/category", verifyToken,  /* schemaValidation(transactionFilterSchema), */ controller.listBy);
// router.get("/category/:type", verifyToken, listTransactionsFilterController);

export default router;