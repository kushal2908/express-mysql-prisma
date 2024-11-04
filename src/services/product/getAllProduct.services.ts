import { prisma } from "@/prisma";
import { SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";

/**
 * Handles fetching all products
 * @param req Express request object
 * @param res Express response object used to send the list of products
 * @returns A JSON response with the list of products if successful
 */
const getAllProduct = async (req: Request, res: Response): Promise<any> => {
  const result = await prisma.product.findMany();
  SUCCESS_RESPONSE(res, "All product fetched", result);
};
export default getAllProduct;
