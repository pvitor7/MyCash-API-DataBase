import express from "express";
import cors from "cors";
import "reflect-metadata";

const app = express();
app.use(express.json());

export default app;

