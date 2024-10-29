import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/helper";
import { Request, Response } from "express";

/**
 * Handles updating a user
 * @param req Express request object containing the user ID as a parameter
 * and the user data to update in the request body
 * @param res Express response object used to send the updated user data
 * @returns A JSON response indicating successful update
 * @throws 400 if the user ID is not found in the request parameter or body
 * @throws 400 if the user data is invalid
 */
const updateUser = async (req: Request, res: Response): Promise<any> => {
  const userExist = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!userExist) {
    ERROR_RESPONSE(res, "User already exist");
  }

  const user = await prisma.user.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: { ...req.body },
  });
  if (!user) {
    ERROR_RESPONSE(res, "Error while user creating");
  }
  return SUCCESS_RESPONSE(res, "User updated successfully");
};
export default updateUser;
