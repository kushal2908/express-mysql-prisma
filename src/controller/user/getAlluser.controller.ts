import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const result = await prisma.user.findMany({
      include: {
        auth: {
          omit: {
            password: true,
          },
        },
      },
    });
    if (!result || result?.length < 1) {
      return res.status(400).json("No user found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export default getAllUsers;
