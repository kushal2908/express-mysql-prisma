import {
  getAllPRoductController,
  getProductByIdController,
  productCreateController,
  productUpdateController,
  searchProductController,
} from "@/controller/product";
import protectedRoutes from "@/middleware/protectedRoute.middleware";
import { Router } from "express";

const productRouter = Router();

productRouter
  .route("/products")
  .get(protectedRoutes, getAllPRoductController)
  .post(protectedRoutes, productCreateController);
productRouter
  .route("/product/:id")
  .get(protectedRoutes, getProductByIdController)
  .put(protectedRoutes, productUpdateController);

productRouter.route("/product/search").get(protectedRoutes, searchProductController);

export default productRouter;
