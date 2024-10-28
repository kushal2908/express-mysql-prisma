import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";

const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!result) {
      return res.status(400).json("No user found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export default getUserById;
