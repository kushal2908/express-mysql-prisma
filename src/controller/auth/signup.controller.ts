import signupDto from "@/dto/auth/signupDto";
import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // validate data
    const { success, error } = signupDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }

    // check user already exist or not
    const authExist = await prisma.auth.findFirst({
      where: {
        username: req.body.username,
      },
    });
    if (authExist) {
      return res.status(400).json("User already exist");
    }
    // Create user first
    const createUser = await prisma.user.create({
      data: {
        name: "",
        age: 0,
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
      },
    });

    if (!createUser) {
      return res.status(400).json("Error creating user");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const createAuthUser = await prisma.auth.create({
      data: {
        ...req.body,
        password: hash,
        userId: createUser.id,
      },
    });
    return res.status(200).json("user created");
  } catch (error) {
    next(error);
  }
};
export default signUp;
