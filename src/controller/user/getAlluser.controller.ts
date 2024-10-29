import { prisma } from "@/prisma";
import { getAllUserService } from "@/services/user";
import { NextFunction, Request, Response } from "express";

/**
 * Handles fetching all users
 * @param req Express request object
 * @param res Express response object used to send the list of users
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response with the list of users if successful,
 * or calls the `next` middleware function with the error if the operation fails
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const allUsers = await getAllUserService(req, res);
    return allUsers;
  } catch (error) {
    next(error);
  }
};
export default getAllUsers;
