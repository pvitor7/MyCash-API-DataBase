import express from "express";
import cors from "cors";
import "reflect-metadata";
import "express-async-errors";
import usersRoute from './api/modules/users/users.route';
import accountRoute from './api/modules/accounts/account.route';
import transactionRoute from './api/modules/transactions/transactions.route';
// import handleAppErrorMiddleware from './middlewares/handleAppErrors.middleware';

const app = express();
app.use(express.json());

app.use("/users", usersRoute);
app.use("/accounts", accountRoute);
app.use("/transactions", transactionRoute);

// app.use(handleAppErrorMiddleware);


export default app;

