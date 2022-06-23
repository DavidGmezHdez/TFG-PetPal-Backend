import { Joi } from "express-validation";

const authValidation = {
    registerUser: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    registerProtector: {
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },

    loginUser: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    },
    loginProtector: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
};

export default authValidation;
