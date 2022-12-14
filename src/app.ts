import express from "express";
import cors from "cors";
import "reflect-metadata";
import "express-async-errors";
import {usersRoute, loginRoute} from './routes/users.route';
import accountRoute from './routes/account.route';
import transactionRoute from './routes/transactions';
import handleAppErrorMiddleware from './middlewares/handleAppErrors.middleware';

const app = express();
app.use(express.json());
app.use(cors());


app.use("/users", usersRoute);
app.use("/login", loginRoute);
app.use("/accounts", accountRoute);
app.use("/transactions", transactionRoute);

app.use(handleAppErrorMiddleware);

export default app;

