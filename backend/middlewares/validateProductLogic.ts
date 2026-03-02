import asyncHandler from 'express-async-handler';
import ApiError from '../utils/apiError';
import Category from '../model/categoryModel';
import SubCategory from '../model/subCategoryModel';

export const validateProductLogic = asyncHandler(async (req, res, next) => {
    const {
        category,
        subcategories,
        price,
        priceAfterDiscount,
    } = req.body;

    const categoryDoc = await Category.findById(category);
    if (!categoryDoc) {
        return next(new ApiError('No category for this id', 404));
    }

    if (subcategories && subcategories.length > 0) {
        const subcats = await SubCategory.find({
            _id: { $in: subcategories },
        });

        if (subcats.length !== subcategories.length) {
            return next(new ApiError('Invalid subcategories ids', 400));
        }

        const invalidSub = subcats.some(
            (sub) => sub.category.toString() !== category
        );

        if (invalidSub) {
            return next(
                new ApiError('Some subcategories do not belong to this category', 400)
            );
        }
    }

    if (
        priceAfterDiscount !== undefined &&
        priceAfterDiscount >= price
    ) {
        return next(
            new ApiError('priceAfterDiscount must be lower than price', 400)
        );
    }

    next();
});

export const validateUpdateProductLogic = asyncHandler(async (req, res, next) => {
  if (!req.body.category && !req.body.subcategories) return next();

  // لو category اتبعت
  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return next(new ApiError('No category for this id', 404));
    }
  }


  if (req.body.subcategories) {
    if (!req.body.category) {
      return next(
        new ApiError('Category is required when updating subcategories', 400)
      );
    }

    const subcats = await SubCategory.find({
      _id: { $in: req.body.subcategories },
    });

    const invalid = subcats.some(
      (sub) => sub.category.toString() !== req.body.category
    );

    if (invalid) {
      return next(
        new ApiError('Some subcategories do not belong to this category', 400)
      );
    }
  }

  next();
});
