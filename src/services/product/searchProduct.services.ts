import { prisma } from '@/prisma';
import { SUCCESS_RESPONSE } from '@/utils/helper';
import { Request, Response } from 'express';

/**
 * Handles searching products
 * @param req Express request object containing the query parameters
 * @param res Express response object used to send the search result
 * @returns A JSON response with the search result if the search is successful,
 * or calls the `next` middleware function with the error if the search fails
 */
const searchProduct = async (req: Request, res: Response): Promise<any> => {
    const { q } = req.query;
    const result = await prisma.product.findMany({
        where: {
            description: {
                search: q?.toString(),
                contains: q?.toString(), // This generates WHERE name LIKE '%phone%'
            },
            name: {
                search: q?.toString(),
                contains: q?.toString(), // This generates WHERE name LIKE '%phone%'
            },
        },
    });
    return SUCCESS_RESPONSE(res, 'Product Search', result);
};

export default searchProduct;
