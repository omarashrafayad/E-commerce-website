import { createEntityValidators } from "./createEntityValidators";

const validators = createEntityValidators({ entityName: "brand" });

export const getBrandValidator = validators.getValidator;
export const createBrandValidator = validators.createValidator;
export const updateBrandValidator = validators.updateValidator;
export const deleteBrandValidator = validators.deleteValidator;
