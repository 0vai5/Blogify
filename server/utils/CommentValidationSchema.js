import joi from "joi";

export const createCommentSchema = joi.object({
    comment: joi.string().required(),
    blogId: joi.string().required(),
})