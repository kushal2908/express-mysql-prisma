import bcrypt from "bcrypt";
import { Response } from "express";

/**
 * Hashes a given password using bcrypt.
 *
 * @param password - The password to be hashed as a string.
 * @returns The hashed password as a string.
 */
export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

/**
 * Sends a successful response with a given message and optional data.
 *
 * @param res - The Express response object.
 * @param msg - The message to be sent in the response.
 * @param data - Optional data to be sent in the response.
 * @returns The response object.
 */
export const SUCCESS_RESPONSE = (res: Response, msg: string, data?: any) => {
  return res.status(200).json({
    status: 200,
    success: true,
    message: msg,
    data,
  });
};
/**
 * Sends an error response with a given message and optional data.
 *
 * @param res - The Express response object.
 * @param msg - The message to be sent in the response.
 * @param data - Optional data to be sent in the response.
 * @returns The response object.
 */
export const ERROR_RESPONSE = (res: Response, msg: string, data?: any) => {
  return res.status(400).json({
    status: 400,
    success: false,
    message: msg,
    data,
  });
};
