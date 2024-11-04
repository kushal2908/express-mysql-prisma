import { prisma } from "@/prisma";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Checks if the request is authenticated and authorized
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 * @returns A promise that resolves with the next middleware function if the request is authenticated and authorized, or a JSON response with an error message if not
 */
const protectedRoutes = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  let token;
  // Check if the request has an Authorization header with a Bearer token
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];
      // Verify the token using the JWT_SECRET environment variable
      const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      // check if the user is still signed in
      const checkSignIn = await prisma.auth.findUnique({
        where: {
          id: decode.data.authId,
        },
      });

      if (!checkSignIn?.isSignedIn) {
        return res.status(401).json({
          msg: "Unauthorized",
        });
      }
      // If the token is valid, call the next middleware function
      next();
    } catch (err) {
      // If the token is invalid, log the error and return a 401 Unauthorized response
      console.log(err);
      res.status(401).json({
        msg: "Unauthorized",
      });
    }
  } else {
    // If the request does not have an Authorization header, return a 403 Forbidden response
    res.status(403).json({
      msg: "Forbidden",
    });
  }
};

export default protectedRoutes;
