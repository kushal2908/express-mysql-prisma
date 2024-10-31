import { productCreateDto } from "@/dto/product/productDto";
import { productCreateService } from "@/services/product";
import { ERROR_RESPONSE } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";

/**
 * Handles creating a product
 * @param req Express request object containing the product data to create in the request body
 * @param res Express response object used to send the created product data
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response indicating successful creation of the product
 * @throws 400 if the product data is invalid
 * @throws 500 if there is a server error
 */
const productCreate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Validate
    const validate = productCreateDto.safeParse(req.body);
    if (!validate.success) {
      return ERROR_RESPONSE(res, "Error creating product", validate.error);
    }

    const productCreate = await productCreateService(req, res);
    return productCreate;
  } catch (error) {
    next(error);
  }
};
export default productCreate;
