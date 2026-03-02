import multer from "multer";
import ApiError from "../utils/apiError";
import { Request } from 'express';

const multerOptions = () => {

    const multerStorage = multer.memoryStorage();
const multerFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new ApiError('Only images allowed', 400));
    }
};

    const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

    return upload;
};

export const  uploadSingleImage = (fieldName:string) => multerOptions().single(fieldName);

export const  uploadMixOfImages = (arrayOfFields:any) =>multerOptions().fields(arrayOfFields);