import signupDto from "@/dto/auth/signupDto";
import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { singupService } from "@/services/auth";

/**
 * Handles signup logic
 * @param req Express request object containing the user's signup data
 * @param res Express response object used to send the signup success message
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response indicating successful signup
 */
const signUp = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // validate data
    const { success, error } = signupDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }

    const signup = await singupService(req, res);
    return signup;
  } catch (error) {
    next(error);
  }
};
export default signUp;
