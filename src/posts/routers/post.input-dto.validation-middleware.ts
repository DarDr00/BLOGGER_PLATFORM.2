import { body } from "express-validator";
import { resourceTypeValidation } from "../../core/middlewares/validation/resource-type.validation-middleware";
import { ResourceType } from "../../core/types/resource-type";

export const titleValidation = body('data.attributes.title')
.isString()
.withMessage('title must be a string')
.trim()
.isLength({ min: 1, max: 30 })
.withMessage('Title must be 1-30 characters');


export const shortDescriptionValidation = body('data.attributes.shortDescription')
.isString()
.withMessage('shortDescription must be a string')
.trim()
.isLength({ min: 1, max: 100 })
.withMessage('shortDescription must be 1-100 characters');


export const contentValidation = body('data.attributes.content')
.isString()
.withMessage('content must be a string')
.trim()
.isLength({ min: 1, max: 1000 })
.withMessage('Content must be 1-1000 characters');    



export const blogIdValidation = body('data.attributes.blogId')
.isString()
.withMessage('blogId must be a string')
.trim()
.isMongoId()
.withMessage('Invalid format ObjectId');  

export const postCreateInputValidation = [
    resourceTypeValidation(ResourceType.Posts),
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
];