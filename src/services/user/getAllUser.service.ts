import { prisma } from '@/prisma';
import { ERROR_RESPONSE, SUCCESS_RESPONSE } from '@/utils/helper';
import { Request, Response } from 'express';

/**
 * Handles getting all users
 * @param req Express request object
 * @param res Express response object used to send the list of users
 * @returns A JSON response with the list of users
 */
const getAllUsers = async (req: Request, res: Response): Promise<any> => {
    const result = await prisma.user.findMany({});
    if (!result || result?.length < 1) {
        return ERROR_RESPONSE(res, 'No user found');
    }
    return SUCCESS_RESPONSE(res, 'All users list', result);
};
export default getAllUsers;
