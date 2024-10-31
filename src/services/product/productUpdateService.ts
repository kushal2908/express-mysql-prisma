import { prisma } from "@/prisma";
import { ERROR_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";

export const productUpdateService = async (req: Request, res: Response): Promise<any> => {
  // get products existing data
  const getProductsExistingData = await prisma.product.findUnique({
    where: {
      id: req.params.id,
    },
  });

  //   check if the sku already exist or not
  const skuExist = await prisma.product.findFirst({
    where: {
      sku: req.body.sku,
    },
  });
  if (skuExist) {
    return ERROR_RESPONSE(res, "SKU already exist");
  }

  // update the product
  const updateProduct = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...req.body,
    },
  });

  //   update stock table
  const updateStockTable = await prisma.stock.update({
    where: {
      productId: req.params.id,
    },
    data: {
      productId: req.params.id,
      qty: req.body.qty,
    },
  });

  // Update stock history table
  await prisma.stock_history.create({
    where: {
      stockId: updateStockTable.id,
    },
    data: {
      stockId: updateStockTable.id,
      productId: req.params.id,
    },
  });
};
