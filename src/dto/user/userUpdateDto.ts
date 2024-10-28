import { z } from "zod";

const dto = z.object({
  name: z.string().max(255),
  age: z.number().positive().gte(18).max(999),
  email: z.string().email(),
  phone: z.string().min(3).max(50),
  address: z.string().max(255),
  city: z.string().max(255),
  country: z.string().max(255),
});

const userUpdateDto = dto.partial();

export default userUpdateDto;
