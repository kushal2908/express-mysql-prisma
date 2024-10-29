import { Router } from "express";
import { signinController, signupController, singoutController } from "@/controller/auth";

const authRouter = Router();

authRouter.post("/signin", signinController);
authRouter.post("/signup", signupController);
authRouter.post("/signout/:id", singoutController);

export default authRouter;
