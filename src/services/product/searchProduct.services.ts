import { SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";

/**
 * Handles searching products
 * @param req Express request object containing the query parameters
 * @param res Express response object used to send the search result
 * @returns A JSON response with the search result if the search is successful,
 * or calls the `next` middleware function with the error if the search fails
 */
const searchProduct = async (req: Request, res: Response): Promise<any> => {
  return;
};

export default searchProduct;
