import asyncHandler from 'express-async-handler';
import Category from '../model/categoryModel'
import * as factory from './handleFactory';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import { uploadSingleImage } from '../middlewares/uploadImageMiddleware';

export const uploadCategoryImage = uploadSingleImage('image');

export const resizeCategoryImage = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        if (!req.file) return next();

        const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer)
            .resize(600, 600)
            .toFormat('jpeg')
            .jpeg({ quality: 95 })
            .toFile(`uploads/categories/${filename}`);

        req.body.image = filename;

        next();
    }
);

export const getAllCategories = factory.getAll(Category);
export const getCategory = factory.getOne(Category);
export const createCategory = factory.createOne(Category);
export const updateCategory = factory.updateOne(Category);
export const deleteCtagory = factory.deleteOne(Category);


