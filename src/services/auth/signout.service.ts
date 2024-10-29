import { prisma } from "@/prisma";
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from "@/utils/helper";
import { NextFunction, Request, Response } from "express";

/**
 * Handles signout logic for a user.
 *
 * This function updates the user's authentication and history records to reflect
 * the signout action by setting `isSignedIn` to false in the `auth` table and
 * updating the `case` to "SINGOUT" in the `auth_history` table.
 *
 * @param req Express request object containing the user ID as a parameter
 * @param res Express response object used to send the signout success message
 * @returns A JSON response indicating successful signout
 */

const signout = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const latestAuthHistory = await prisma.auth_history.findFirst({
    where: { authId: userId },
    orderBy: { id: "desc" },
  });

  if (!latestAuthHistory) {
    return ERROR_RESPONSE(res, "Error! while signing out");
  }

  // Updating tables
  await prisma.auth.update({
    where: { id: userId },
    data: { isSignedIn: false },
  });
  await prisma.auth_history.update({
    where: { id: latestAuthHistory.id },
    data: { case: "SIGNOUT" },
  });

  return SUCCESS_RESPONSE(res, "Signout success");
};
export default signout;
