import { prisma } from "@/prisma";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

const singout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const userFromAuthHistoryTable = await prisma.auth_history.findFirst({
      where: {
        userId: parseInt(req.params.id),
      },
    });
    const updateAuthTable = await prisma.auth.update({
      where: {
        id: userFromAuthHistoryTable?.authId,
      },
      data: {
        isSignedIn: false,
      },
    });
    const updateAuthHistoryTable = await prisma.auth_history.update({
      where: {
        id: userFromAuthHistoryTable?.id,
      },
      data: {
        case: "SINGOUT",
      },
    });
    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
export default singout;
