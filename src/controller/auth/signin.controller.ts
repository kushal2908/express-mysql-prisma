import signinDto from "@/dto/auth/signinDto";
import { prisma } from "@/prisma";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const signin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // validate data
    const { success, error } = signinDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }

    // check user already exist or not
    const userExist = await prisma.auth.findFirst({
      where: {
        username: req.body.username,
      },
    });
    if (!userExist) {
      return res.status(400).json("User doesn't exist");
    }
    // Match password
    const passwordMatch = bcrypt.compareSync(req.body.password, userExist.password);
    if (!passwordMatch) {
      return res.status(400).json("Invalid credential");
    }
    // Create token
    const token = jwt.sign(
      {
        data: {
          username: userExist?.username,
          userId: userExist?.id,
          role: userExist?.role,
        },
      },
      process.env.JWT_SECRET || "",
      {
        expiresIn: "1d",
      }
    );

    // Login the user
    const login = await prisma.auth_history.create({
      data: {
        authId: userExist.id,
        userId: userExist.userId,
      },
    });
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
export default signin;
