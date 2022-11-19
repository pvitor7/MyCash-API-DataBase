import express from "express";
import cors from "cors";
import "reflect-metadata";
import "express-async-errors";
import usersRoute from './routes/users.route';
import accountRoute from './routes/account.route';
import transactionRoute from './routes/transactions';

const app = express();
app.use(express.json());

app.use("/users", usersRoute);
app.use("/accounts", accountRoute);
app.use("/transactions", transactionRoute);


export default app;

