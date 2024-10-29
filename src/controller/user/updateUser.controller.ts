import userUpdateDto from "@/dto/user/userUpdateDto";
import { prisma } from "@/prisma";
import { updateUserService } from "@/services/user";
import { NextFunction, Request, Response } from "express";

/**
 * Handles updating a user
 * @param req Express request object containing the user ID as a parameter
 * and the user data to update in the request body
 * @param res Express response object used to send the updated user data
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response indicating successful update
 * @throws 400 if the user ID is not found in the request parameter or body
 * @throws 400 if the user data is invalid
 */
const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // validate data
    const { success, error } = userUpdateDto.safeParse(req.body);
    if (!success) {
      return res.status(400).json(error);
    }
    const updateUser = updateUserService(req, res);
    return updateUser;
  } catch (error) {
    next(error);
  }
};
export default updateUser;
