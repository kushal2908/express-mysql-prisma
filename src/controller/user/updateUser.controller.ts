import userUpdateDto from "@/dto/user/userUpdateDto";
import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";

const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // validate data
    const { success, error } = userUpdateDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }

    // check user exist or not
    const userExist = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (!userExist) {
      return res.status(400).json("User already exist");
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: { ...req.body },
    });
    if (!user) {
      return res.status(400).json("Error while user creating");
    }
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
export default updateUser;
