import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./documentation";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// ROUTE DECLARATION
app.use("/", authRouter); // Auth router
app.use("/", userRouter); // User router
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //Documentation URL

export default app;
