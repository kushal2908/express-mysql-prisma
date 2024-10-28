import userCreateDto from "@/dto/user/userDto";
import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // validate data
    const { success, error } = userCreateDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }

    // check user exist or not
    const userExist = await prisma.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (userExist) {
      return res.status(400).json("User already exist");
    }
    const user = await prisma.user.create({
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
export default createUser;
