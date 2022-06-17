import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import "colors";
import { connectDatabase } from "./config/mongoDB";
import errorHandler from "./middleware/errorHandler";
import userRoutes from "./routes/user/userRoutes";
import orderRoutes from "./routes/order/orderRoutes";
import productRoutes from "./routes/product/productRoutes";
import refreshTokenRoutes from "./routes/refreshToken/refreshTokenRoutes";

dotenv.config();
const port = process.env.PORT || 3001;
connectDatabase();

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

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/refresh", refreshTokenRoutes);

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server live on port: ${port}`.underline.magenta);
});
