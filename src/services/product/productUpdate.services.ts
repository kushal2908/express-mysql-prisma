import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";
const productUpdateService = async (req: Request, res: Response): Promise<any> => {
  // get exsting product, stock and stock_history data
  const getExistingProduct = await prisma.product.findFirst({
    where: {
      id: req.params.id,
    },
    orderBy: {
      id: "desc",
    },
  });

  const getExistingProductStock = await prisma.stock.findFirst({
    where: {
      productId: getExistingProduct?.id,
    },
    orderBy: {
      id: "desc",
    },
  });
  const getExistingProductStockHistory = await prisma.stock_history.findFirst({
    where: {
      stockId: getExistingProductStock?.id,
    },
    orderBy: {
      id: "desc",
    },
  });

  // validate
  if (!getExistingProduct) {
    return ERROR_RESPONSE(res, "Product doesnt exist!");
  }
  // Update product table
  await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      ...req.body,
    },
  });
  // Update stock table
  await prisma.stock.update({
    where: {
      id: getExistingProductStock?.id,
    },
    data: {
      productId: req.params.id,
      qty: req.body.qty,
    },
  });
  // Update stock_history table
  await prisma.stock_history.update({
    where: {
      id: getExistingProductStockHistory?.id,
    },
    data: {
      stockId: getExistingProductStock?.id,
      productId: req.params.id,
      currQty: req.body.qty + getExistingProductStockHistory?.prevQty,
      prevQty: getExistingProductStockHistory?.prevQty,
      changedQty: req.body.qty,
    },
  });
  return SUCCESS_RESPONSE(res, "Product updated");
};
export default productUpdateService;
