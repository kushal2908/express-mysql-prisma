import {
    getAllProductController,
    getProductByIdController,
    productCreateController,
    productUpdateController,
    searchProductController,
} from '@/controller/product';
import protectedRoutes from '@/middleware/protectedRoute.middleware';
import { Router } from 'express';

const productRouter = Router();

productRouter.route('/products').get(protectedRoutes, getAllProductController).post(protectedRoutes, productCreateController);
productRouter.route('/product/:id').get(protectedRoutes, getProductByIdController).put(protectedRoutes, productUpdateController);
productRouter.route('/product').get(protectedRoutes, searchProductController);

export default productRouter;
