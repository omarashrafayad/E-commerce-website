import { createEntityValidators } from "./createEntityValidators";

const validators = createEntityValidators({ entityName: "category" });

export const getCategoryValidator = validators.getValidator;
export const createCategoryValidator = validators.createValidator;
export const updateCategoryValidator = validators.updateValidator;
export const deleteCategoryValidator = validators.deleteValidator;
