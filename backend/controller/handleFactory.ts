import { Request, Response, NextFunction } from 'express';
import { Model, Document, Query } from 'mongoose';
import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError';
import ApiFeatures from '../utils/apiFeatures';


export const getAll = <T extends Document>(model: Model<T>, modelName: string | undefined = '') =>
  asyncHandler(async (req: Request, res: Response) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const apiFeatures = new ApiFeatures(model.find(filter), req.query)
      .filter()
      .search(modelName);

    // count بعد filter + search فقط
    const countQuery = apiFeatures.mongooseQuery.clone();
    const documentCount = await countQuery.countDocuments();

    // بعد كده كمل باقي العمليات
    apiFeatures
      .limitFields()
      .sort()
      .paginate(documentCount);

    const { mongooseQuery, paginationResult } = apiFeatures;
    const docs = await mongooseQuery;

    res.status(200).json({
      results: docs.length,
      data: docs,
      paginationResult
    });
  });


export const getOne = <T extends Document>(model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await model.findById(req.params.id);

    if (!doc) {
      return next(new ApiError(`No document for this id`, 404));
    }

    res.status(200).json({ data: doc });
  });


export const createOne = <T extends Document>(model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const doc = await model.create(req.body);
    res.status(201).json({ data: doc });
  });


// export const updateOne = <T extends Document>(model: Model<T>) =>
//     asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
//         const doc = await model.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );

//         if (!doc) {
//             return next(new ApiError(`No document for this ${req.params.id}`, 404));
//         }

//         res.status(200).json({ data: doc });
//     });
export const updateOne = <T extends Document>(model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const oldDoc = await model.findById(req.params.id);

    if (!oldDoc) {
      return next(new ApiError(`No document for this ${req.params.id}`, 404));
    }

    const imageFields = ['imageCover', 'image', 'profileImg'];

    imageFields.forEach((field) => {
      if (!req.body[field] && (oldDoc as any)[field]) {
        const oldVal = (oldDoc as any)[field];
        req.body[field] = typeof oldVal === 'string' ? oldVal.split('/').pop() : oldVal;
      }
    });

    if (!req.body.images && (oldDoc as any).images) {
      const oldImages = (oldDoc as any).images;
      if (Array.isArray(oldImages)) {
        req.body.images = oldImages.map((img: string) => typeof img === 'string' ? img.split('/').pop() : img);
      } else {
        req.body.images = oldImages;
      }
    }

    const updatedDoc = await model.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({ data: updatedDoc });
  });

export const deleteOne = <T extends Document>(model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new ApiError(`No document for this id`, 404));
    }

    res.status(204).json({ message: 'item deleted successfully' });
  });
