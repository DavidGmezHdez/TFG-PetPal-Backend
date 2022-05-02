import { Joi } from "express-validation";

const petValidation = {
    create: {
        body: Joi.object({
            name: Joi.string().required(),
            type: Joi.string().required(),
            age: Joi.number().required(),
            color: Joi.string(),
            size: Joi.string(),
            specialTraits: Joi.array().optional(),
            owner: Joi.string().allow("").optional()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            name: Joi.string().optional(),
            type: Joi.string().optional(),
            age: Joi.number().optional(),
            color: Joi.string().optional(),
            size: Joi.string().optional(),
            specialTraits: Joi.array().optional(),
            owner: Joi.string().allow("").optional()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            name: Joi.string().optional(),
            type: Joi.string().optional(),
            age: Joi.number().optional(),
            color: Joi.string().optional(),
            size: Joi.string().optional(),
            specialTraits: Joi.array().optional(),
            owner: Joi.string().allow("").optional()
        })
    }
};

export default petValidation;
