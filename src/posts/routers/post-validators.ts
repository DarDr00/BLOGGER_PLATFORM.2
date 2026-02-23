import { body } from "express-validator";
import { resourceTypeValidation } from "../../core/middlewares/validation/resource-type.validation-middleware";
import { ResourceType } from "../../core/types/resource-type";


export const postValidators = [
body('title')
.isString()
.withMessage('title must be a string')
.trim()
.isLength({ min: 1, max: 30 })
.withMessage('Title must be 1-30 characters'),


body('shortDescription')
.isString()
.withMessage('shortDescription must be a string')
.trim()
.isLength({ min: 1, max: 100 })
.withMessage('shortDescription must be 1-100 characters'),


body('content')
.isString()
.withMessage('content must be a string')
.trim()
.isLength({ min: 1, max: 1000 })
.withMessage('Content must be 1-1000 characters'),
]