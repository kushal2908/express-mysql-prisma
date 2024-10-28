import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
  // omit: {
  //   auth: {
  //     password: true,
  //   },
  // },
});
