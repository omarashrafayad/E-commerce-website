/// <reference path="../types/express.d.ts" />
import  asyncHandler  from 'express-async-handler';
import SubCategory from "../model/subCategoryModel";
import * as factory from './handleFactory'; 

export const setCategoryIdToBody = asyncHandler(async(req,res,next)=>{
    if(!req.body.category) req.body.category = req.params.categoryId
    next()
})

export const createFilterObj = asyncHandler(async(req,res,next)=>{
    let filterObject = {}
    if(req.params.categoryId) filterObject = {category: req.params.categoryId}
    req.filterObj = filterObject
    next()
})

export const getSubCategories = factory.getAll(SubCategory);

export const getSubCategory = factory.getOne(SubCategory);

export const createSubCategory = factory.createOne(SubCategory);

export const updateSubCategory = factory.updateOne(SubCategory);

export const deleteSubCategory = factory.deleteOne(SubCategory);

