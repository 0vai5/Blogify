import joi from 'joi';

export const userSignUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    name: joi.string().required()
});

export const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})
