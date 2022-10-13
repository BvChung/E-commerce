import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express, Request, Response, NextFunction } from "express";
import "colors";
import { connectDatabase } from "./config/mongoConfig";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/admin/adminRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import refreshTokenRoutes from "./routes/refreshTokenRoutes";

dotenv.config();
const port = process.env.PORT || 3001;
connectDatabase();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"http://127.0.0.1:5500",
			"http://localhost:3001",
		],
		credentials: true,
	})
);

app.use(cookieParser());
// app.use(function (req: Request, res: Response, next: NextFunction) {
// 	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
// 	res.setHeader(
// 		"Access-Control-Allow-Methods",
// 		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
// 	);
// 	// res.setHeader(
// 	// 	"Access-Control-Allow-Headers",
// 	// 	"X-Requested-With,content-type"
// 	// );
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	// @ts-ignore
// 	res.setHeader("Access-Control-Allow-Credentials", true);

// 	next();
// });

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/refresh", refreshTokenRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server live on port: ${port}`.underline.magenta);
});
