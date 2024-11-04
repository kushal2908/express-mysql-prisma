import { getAllProductService } from "@/services/product";
import { NextFunction, Request, Response } from "express";
/**
 * Handles fetching all products
 * @param req Express request object
 * @param res Express response object used to send the list of products
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response with the list of products
 */
const getAllProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const response = getAllProductService(req, res);
    return response;
  } catch (error) {
    next(error);
  }
};

export default getAllProduct;
