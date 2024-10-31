import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./documentation";
import { authRoute, productRoute, userRoute } from "./routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());

// ROUTE DECLARATION
app.use("/", authRoute); // Auth router
app.use("/", userRoute); // User router
app.use("/", productRoute); // Product router
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); //Documentation URL
app.get("/", (_, res) => {
  res.send("API v0.0.1");
});

export default app;
