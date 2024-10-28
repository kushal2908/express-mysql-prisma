import { z } from "zod";

const signinDto = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8).max(50),
});

export default signinDto;
