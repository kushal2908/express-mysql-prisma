import { getProductByIdService } from "@/services/product";
import { NextFunction, Request, Response } from "express";
/**
 * Handles getting a product by ID
 * @param req Express request object containing the product ID as a parameter
 * @param res Express response object used to send the product data
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response with the product data if the product is found,
 * or calls the `next` middleware function with the error if the product does not exist
 */
const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const result = getProductByIdService(req, res);
    return result;
  } catch (error) {
    next(error);
  }
};

export default getProductById;
