import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";
const productCreate = async (req: Request, res: Response) => {
  const product = req.body;
  // Check sku exists
  const skuExist = await prisma.product.findFirst({
    where: {
      sku: product.sku,
    },
  });
  if (skuExist) {
    return ERROR_RESPONSE(res, "Sku exist!");
  }
  // Create product
  const createdProduct = await prisma.product.create({
    data: {
      ...product,
    },
  });
  if (!createdProduct) {
    return ERROR_RESPONSE(res, "Error creating product", createdProduct);
  }
  //   Add the product to stock
  const createdStock = await prisma.stock.create({
    data: {
      productId: createdProduct.id,
      qty: product.qty,
      type: "IN",
    },
  });

  // Add the product to stock_history
  await prisma.stock_history.create({
    data: {
      stockId: createdStock.id,
      productId: createdProduct.id,
      currQty: product.qty,
      prevQty: 0,
      changedQty: product.qty,
      type: "IN",
    },
  });
  return SUCCESS_RESPONSE(res, "Product created successfully");
};
export default productCreate;
