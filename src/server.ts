import dotenv from "dotenv";
import express, { Request, Response } from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
} from "./controller/user";
import { signinController, signupController } from "./controller/auth";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3366;

// Routes
// Auth
app.post("/signup", signupController);
app.post("/signin", signinController);
// User
app.get("/users", getAllUsersController);
app.post("/users", createUserController);
app.get("/user/:id", getUserByIdController);
app.put("/user/:id", updateUserController);

// Welcome page
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to Express-MySQL-Prisma boilerplate");
});

// 404 handle
app.use((req, res, next) => {
  res.status(404).send("404 - Not Found");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
