import { searchProductService } from '@/services/product';
import { ERROR_RESPONSE } from '@/utils/helper';

import { NextFunction, Request, Response } from 'express';

/**
 * Handles searching for products
 * @param req Express request object containing the search query as a parameter
 * @param res Express response object used to send the search result
 * @param next Express next middleware function used to handle errors
 * @returns A JSON response with the search result if the search is successful,
 * or calls the `next` middleware function with the error if the search fails
 */
const searchProduct = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { q } = req.query; // Search term
        if (!q) return ERROR_RESPONSE(res, 'Query parameter is required');
        const result = await searchProductService(req, res);
        return result;
    } catch (error) {
        next(error);
    }
};

export default searchProduct;
