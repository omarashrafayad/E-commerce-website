import { createEntityValidators } from "./createEntityValidators";

const validators = createEntityValidators({ entityName: "subCategory" });

export const getSubCategoryValidator = validators.getValidator;
export const createSubCategoryValidator = validators.createValidator;
export const updateSubCategoryValidator = validators.updateValidator;
export const deleteSubCategoryValidator = validators.deleteValidator;
