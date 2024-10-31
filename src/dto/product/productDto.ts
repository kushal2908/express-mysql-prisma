import { z } from "zod";

export const productCreateDto = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  sku: z.string().min(3),
  qty: z.number().positive(),
});

export const productUpdateDto = productCreateDto.partial();
