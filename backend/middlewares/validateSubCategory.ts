import asyncHandler from 'express-async-handler';
import Category from '../model/categoryModel';
import SubCategory from '../model/subCategoryModel';
import ApiError from '../utils/apiError';
import { Request, Response, NextFunction } from 'express';

export const checkCategoryExists = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { category } = req.body;

        if (!category) {
            return next(new ApiError('Category is required', 400));
        }

        const categoryDoc = await Category.findById(category);
        if (!categoryDoc) {
            return next(new ApiError('No category found with this ID', 404));
        }

        next();
    }
);

export const checkSubCategoryUpdateCategory = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params; 
        const { category } = req.body;

        const subCategory = await SubCategory.findById(id);
        if (!subCategory) {
            return next(new ApiError('SubCategory not found', 404));
        }

        if (category && subCategory.category.toString() !== category) {
            return next(
                new ApiError(
                    'You can only update SubCategory under its original Category',
                    400
                )
            );
        }

        next();
    }
);
