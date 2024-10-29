import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE, hashPassword } from "@/utils/helper";
import { Request, Response } from "express";

/**
 * Handles signup logic
 * @param req Express request object containing the user's signup data
 * @param res Express response object used to send the signup success message
 * @returns A JSON response indicating successful signup
 */
const signup = async (req: Request, res: Response): Promise<any> => {
  // check user already exist or not
  const authExist = await prisma.auth.findFirst({
    where: {
      username: req.body.username,
    },
  });
  if (authExist) {
    return ERROR_RESPONSE(res, "User already exist");
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
    return ERROR_RESPONSE(res, "Error creating user");
  }

  await prisma.auth.create({
    data: {
      ...req.body,
      password: hashPassword(req.body.password),
      userId: createUser.id,
    },
  });
  return SUCCESS_RESPONSE(res, "user created");
};

export default signup;
