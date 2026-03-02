import  express  from 'express';
import { createFilterObj, createSubCategory, deleteSubCategory, getSubCategories, getSubCategory, setCategoryIdToBody, updateSubCategory } from '../controller/subCategoryController';
import { createSubCategoryValidator, deleteSubCategoryValidator, getSubCategoryValidator, updateSubCategoryValidator } from '../utils/validator/subCategoryValidator';
import { checkCategoryExists, checkSubCategoryUpdateCategory } from '../middlewares/validateSubCategory';
const router = express.Router({mergeParams:true})


router.route('/').get(createFilterObj,getSubCategories)
.post(setCategoryIdToBody,createSubCategoryValidator,checkCategoryExists,createSubCategory)

router.route('/:id').get(getSubCategoryValidator,getSubCategory)
.patch(updateSubCategoryValidator,checkSubCategoryUpdateCategory,updateSubCategory)
.delete(deleteSubCategoryValidator,deleteSubCategory)

export default router;
