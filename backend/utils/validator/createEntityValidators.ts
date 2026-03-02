import { z } from "zod";
import zodValidator from "../../middlewares/validatorMiddleware";

interface EntityValidatorConfig {
    entityName: string; 
    nameMinLength?: number;
    nameMaxLength?: number;
}

export const createEntityValidators = (config: EntityValidatorConfig) => {
    const { 
        entityName, 
        nameMinLength = 3,
        nameMaxLength = 32 
    } = config;

    const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, {
        message: `Invalid ${entityName} id format`
    });

    const nameSchema = z
        .string()
        .min(nameMinLength, `Too short ${entityName} name`)
        .max(nameMaxLength, `Too long ${entityName} name`);

    const getSchema = z.object({
        params: z.object({
            id: mongoId
        })
    });

    const createSchema = z.object({
        body: z.object({
            name: nameSchema
        })
    });

    const updateSchema = z.object({
        params: z.object({
            id: mongoId
        }),
        body: z.object({
            name: nameSchema.optional()
        })
    });

    const deleteSchema = z.object({
        params: z.object({
            id: mongoId
        })
    });

    return {
        getValidator: zodValidator(getSchema),
        createValidator: zodValidator(createSchema),
        updateValidator: zodValidator(updateSchema),
        deleteValidator: zodValidator(deleteSchema)
    };
};

