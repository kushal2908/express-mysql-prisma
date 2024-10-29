import signinDto from "@/dto/auth/signinDto";
import signinService from "@/services/auth/signin.service";
import { NextFunction, Request, Response } from "express";

/**
 * Handles signin logic
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 * @returns Promise that resolves with a JWT token if signin is successful
 */
const signin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, error } = signinDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }
    const signin = signinService(req, res);
    return signin;
  } catch (error) {
    next(error);
  }
};
export default signin;
