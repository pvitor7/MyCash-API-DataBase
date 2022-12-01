import { Router } from "express";
import { schemaValidation, verifyToken } from "../shared/middlewares";
import TransactionController from "./TransactionController";
import { transactionFilterSchema, transactionSchema } from "./validator";

const router = Router();
const controller = new TransactionController();

router.post("", verifyToken, schemaValidation(transactionSchema), controller.create);
router.get("/", verifyToken, controller.list);
router.post("/category", verifyToken, schemaValidation(transactionFilterSchema), controller.listBy);
router.get("/category/:type", verifyToken, controller.listBy);

export default router;