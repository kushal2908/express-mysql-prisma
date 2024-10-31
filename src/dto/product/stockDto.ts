import { StockType } from "@prisma/client";
import { z } from "zod";

export const stockCreateDto = z.object({
  productId: z.string(),
  qty: z.string(),
  type: z.nativeEnum(StockType),
});

export const stockUpdateDto = stockCreateDto.partial();

// NB:
// stock_history doesnt need any dto/schema as it will be added via backend
