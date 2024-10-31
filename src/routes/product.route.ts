import { productCreateController, productUpdateController } from "@/controller/product";
import { Router } from "express";

const productRouter = Router();

productRouter.post("/product", productCreateController);
productRouter.put("/product/:id", productUpdateController);

export default productRouter;
