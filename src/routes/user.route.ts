import { getAllUsersController, getUserByIdController, updateUserController } from "@/controller/user";
import protectedRoutes from "@/middleware/protectedRoute.middleware";
import { Router } from "express";

const userRouter = Router();
// NOTE: when user signup it automatically creates an user
userRouter.route("/users").get(protectedRoutes, getAllUsersController);
userRouter.route("/user/:id").get(protectedRoutes, getUserByIdController).put(protectedRoutes, updateUserController);

export default userRouter;
