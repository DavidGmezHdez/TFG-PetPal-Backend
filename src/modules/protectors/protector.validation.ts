import { Joi } from "express-validation";

const protectorValidation = {
    create: {
        body: Joi.object({
            email: Joi.string().required(),
            name: Joi.string().required(),
            password: Joi.string().required(),
            posts: Joi.array(),
            availablePets: Joi.array(),
            region: Joi.string().required,
            contactPhone: Joi.string().required()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            email: Joi.string().optional(),
            name: Joi.string().optional(),
            password: Joi.string().optional(),
            posts: Joi.array().optional(),
            availablePets: Joi.array().optional(),
            region: Joi.string().optional(),
            contactPhone: Joi.string().optional()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.string().required()
        }),

        body: Joi.object({
            email: Joi.string().optional(),
            name: Joi.string().optional(),
            password: Joi.string().optional(),
            posts: Joi.array().optional(),
            availablePets: Joi.array().optional(),
            region: Joi.string().optional(),
            contactPhone: Joi.string().optional()
        })
    }
};

export default protectorValidation;
