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
            id: Joi.number().required()
        }),

        body: Joi.object({
            email: Joi.string(),
            name: Joi.string(),
            password: Joi.string(),
            posts: Joi.array(),
            availablePets: Joi.array(),
            region: Joi.string(),
            contactPhone: Joi.string()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            email: Joi.string(),
            name: Joi.string(),
            password: Joi.string(),
            posts: Joi.array(),
            availablePets: Joi.array(),
            region: Joi.string(),
            contactPhone: Joi.string()
        })
    }
};

export default protectorValidation;
