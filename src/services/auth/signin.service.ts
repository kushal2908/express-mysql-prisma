import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/helper";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Handles signin logic
 * @param req Express request object
 * @param res Express response object
 * @returns Promise that resolves with a JWT token if signin is successful
 * @throws 400 if user doesn't exist or is still signed in
 * @throws 400 if password is invalid
 */
export const signinService = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  const user = await prisma.auth.findFirst({ where: { username } });
  if (!user) {
    return ERROR_RESPONSE(res, "User doesn't exist");
  }

  if (user.isSignedIn) {
    return ERROR_RESPONSE(res, "User is still signed in");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return ERROR_RESPONSE(res, "Invalid credential");
  }

  const token = jwt.sign(
    {
      data: {
        username: user.username,
        authId: user.id,
        userId: user.userId,
        role: user.role,
      },
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    }
  );

  await prisma.auth_history.create({
    data: {
      authId: user.id,
      userId: user.userId,
      case: "SIGNIN",
    },
  });
  await prisma.auth.update({
    where: { id: user.id },
    data: { isSignedIn: true },
  });

  return SUCCESS_RESPONSE(res, "Signin success", token);
};

export default signinService;
