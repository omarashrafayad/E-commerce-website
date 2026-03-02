import { z } from 'zod';
import Review from '../../model/reviewModel';
import zodValidator from '../../middlewares/validatorMiddleware';
import { createEntityValidators } from './createEntityValidators';

const validators = createEntityValidators({ entityName: 'Review' });

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid MongoId format',
});

export const createReviewSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        ratings: z
            .number()
            .min(1, 'Ratings value must be between 1 to 5')
            .max(5, 'Ratings value must be between 1 to 5'),
        product: mongoId,
    }),
});

export const updateReviewSchema = z.object({
    params: z.object({
        id: mongoId,
    }),
    body: z.object({
        title: z.string().optional(),
        ratings: z.number().min(1).max(5).optional(),
    }),
});


export const createReviewValidator = zodValidator(createReviewSchema);
export const updateReviewValidator = zodValidator(updateReviewSchema);
export const deleteReviewValidator = validators.deleteValidator;
export const getReviewValidator = validators.getValidator;
