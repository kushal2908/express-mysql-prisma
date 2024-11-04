import { prisma } from "@/prisma";
import { SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";
/**
 * Handles getting a product by ID
 * @param req Express request object containing the product ID as a parameter
 * @param res Express response object used to send the product data
 * @returns A JSON response with the product data if the product is found
 */
const getProductById = async (req: Request, res: Response): Promise<any> => {
  const result = await prisma.product.findUnique({
    where: {
      id: req.params.id,
    },
  });
  return SUCCESS_RESPONSE(res, "Product fetched", result);
};
export default getProductById;
