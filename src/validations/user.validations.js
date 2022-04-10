import { Joi } from "express-validation";

const userValidation = {
    create: {
        body: Joi.object({
            nombre: Joi.string().required()
        })
    },

    update: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            nombre: Joi.string().required()
        })
    },

    partialUpdate: {
        params: Joi.object({
            id: Joi.number().required()
        }),

        body: Joi.object({
            nombre: Joi.string()
        })
    }
};

export default userValidation;
