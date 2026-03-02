import express  from "express";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from '../utils/validator/categoryValidator';
import {createCategory, deleteCtagory, getAllCategories, getCategory, resizeCategoryImage, updateCategory, uploadCategoryImage} from '../controller/categoryController'
import subcategoriesRoute from '../routes/subCategoryRoute'

const router = express.Router();
router.use('/:categoryId/subcategories',subcategoriesRoute)
router.route('/').get(getAllCategories).post(uploadCategoryImage,resizeCategoryImage,createCategoryValidator,createCategory);
router.route('/:id').get(getCategoryValidator,getCategory)
.patch(uploadCategoryImage,resizeCategoryImage,updateCategoryValidator,updateCategory)
.delete(deleteCategoryValidator,deleteCtagory)
export default router;
