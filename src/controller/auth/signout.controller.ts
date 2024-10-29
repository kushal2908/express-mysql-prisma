import { prisma } from "@/prisma";
import { signoutSerivce } from "@/services/auth";
import { NextFunction, Request, Response } from "express";

/**
 * Handles signout logic for a user.
 *
 * This function calls the `signoutSerivce` service to sign out a user.
 * It returns a JSON response with a success message if the signout is
 * successful, or calls the `next` middleware function with the error
 * if the signout fails.
 *
 * @param req Express request object containing the user ID as a parameter
 * @param res Express response object used to send the signout success message
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response indicating successful signout
 */
const singout = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const signout = await signoutSerivce(req, res);
    return signout;
  } catch (error) {
    next(error);
  }
};
export default singout;
