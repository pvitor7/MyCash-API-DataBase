import express from "express";
import cors from "cors";
import "reflect-metadata";
import usersRoute from './routes/users.route';

const app = express();
app.use(express.json());

app.use("/users", usersRoute);

export default app;

