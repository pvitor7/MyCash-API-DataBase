import express from "express";
import cors from "cors";
import "reflect-metadata";
import usersRoute from './routes/users.route';
import accountRoute from './routes/account.route';

const app = express();
app.use(express.json());

app.use("/users", usersRoute);
app.use("/accounts", accountRoute);

export default app;

