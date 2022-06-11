import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";
import colors from "colors";
import { test } from "./test";
const port = 3001;
dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: ["http://localhost:3000", " http://127.0.0.1:5500"],
		credentials: true,
	})
);

app.use(cookieParser());

// app.use("/api/users");

app.listen(port, () => {
	console.log(colors.cyan.underline(`Server live on port: ${port}`));
});
