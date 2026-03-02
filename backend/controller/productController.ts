import products from '../model/productsModel'
import * as factory from './handleFactory';
import asyncHandler from 'express-async-handler';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { uploadMixOfImages } from '../middlewares/uploadImageMiddleware';


export const uploadProductImages = uploadMixOfImages([
    {
        name: 'imageCover',
        maxCount: 1,
    },
    {
        name: 'images',
        maxCount: 5,
    },
]);

export const resizeProductImages = asyncHandler(
    async (req, res, next) => {
        if (!req.files) return next();

        const files = req.files as {
            imageCover?: Express.Multer.File[];
            images?: Express.Multer.File[];
        };

        if (files.imageCover && files.imageCover.length > 0) {
            const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

            await sharp(files.imageCover[0].buffer)
                .resize(2000, 1333)
                .toFormat('jpeg')
                .jpeg({ quality: 95 })
                .toFile(`uploads/products/${imageCoverFileName}`);

            req.body.imageCover = imageCoverFileName;
        }

        if (files.images && files.images.length > 0) {
            req.body.images = [];

            await Promise.all(
                files.images.map(
                    async (img: Express.Multer.File, index: number) => {
                        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

                        await sharp(img.buffer)
                            .resize(2000, 1333)
                            .toFormat('jpeg')
                            .jpeg({ quality: 95 })
                            .toFile(`uploads/products/${imageName}`);

                        req.body.images.push(imageName);
                    }
                )
            );
        }

        next();
    }
);


export const getAllProducts = factory.getAll(products, 'products');

export const getProduct = factory.getOne(products);

export const createProduct = factory.createOne(products);

export const updateProduct = factory.updateOne(products);

export const deleteProduct = factory.deleteOne(products);