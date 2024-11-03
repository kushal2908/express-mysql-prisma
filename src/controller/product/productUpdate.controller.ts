import { productUpdateDto } from "@/dto/product/productDto";
import { productUpdateService } from "@/services/product";

import { ERROR_RESPONSE } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";

/**
 * Handles updating a product
 * @param req Express request object containing the product data to update in the request body
 * @param res Express response object used to send the updated product data
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response indicating successful update of the product
 * @throws 400 if the product data is invalid
 * @throws 500 if there is a server error
 */
const productUpdate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Validate
    const validate = productUpdateDto.safeParse(req.body);
    if (!validate.success) {
      return ERROR_RESPONSE(res, "Error updating product", validate.error);
    }
    const productCreate = await productUpdateService(req, res);
    return productCreate;
  } catch (error) {
    next(error);
  }
};

export default productUpdate;
