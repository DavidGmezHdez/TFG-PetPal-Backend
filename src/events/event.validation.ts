import { Joi } from "express-validation";

const eventValidation = {
    create: {
        body: Joi.object({
            name: Joi.string().required()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            name: Joi.string().required()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            name: Joi.string()
        })
    }
};

export default eventValidation;
