import { prisma } from "@/prisma";
import { getUserByIdService } from "@/services/user";
import { NextFunction, Request, Response } from "express";

/**
 * Handles getting a user by ID
 * @param req Express request object containing the user ID as a parameter
 * @param res Express response object used to send the user data
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response with the user data if the user is found,
 * or calls the `next` middleware function with the error if the user does not exist
 */
const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const result = await getUserByIdService(req, res);
    return result;
  } catch (error) {
    next(error);
  }
};
export default getUserById;
