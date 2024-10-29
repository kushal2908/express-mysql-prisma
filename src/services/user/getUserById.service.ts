import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";

/**
 * Handles getting a user by ID
 * @param req Express request object containing the user ID as a parameter
 * @param res Express response object used to send the user data
 * @returns A JSON response with the user data if the user is found,
 * or an error message if the user does not exist
 */
const getUserById = async (req: Request, res: Response): Promise<any> => {
  const result = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    omit: {
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!result) {
    return ERROR_RESPONSE(res, "No user found");
  }
  return SUCCESS_RESPONSE(res, "User list", result);
};
export default getUserById;
