import { Router } from "express";
import { verifyToken } from '../shared/middlewares';
import AccountController from "./AccountController";

const router = Router();
const controller = new AccountController();

router.get("", /*verifyToken, */ controller.retrieve);

export default router;