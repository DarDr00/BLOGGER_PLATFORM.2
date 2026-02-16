import { body } from 'express-validator';
import { blogRepository } from '../../blogs/repositories/blog.repository';

export const postValidators = [
    body('title')
        .bail()
        .notEmpty().withMessage('title is required') 
        .bail()
        .isString().withMessage('title must be a string')
        .bail()
        .trim()
        .isLength({ min: 1, max: 30 }).withMessage('Title must be 1-30 characters'),
    
    body('shortDescription')
        .bail()
        .notEmpty().withMessage('shortDescription is required')
        .bail()
        .isString().withMessage('shortDescription must be a string')
        .bail()
        .trim()
        .isLength({ min: 1, max: 100 }).withMessage('shortDescription must be 1-100 characters'),
    
    body('content')
        .bail()
        .notEmpty().withMessage('content is required')
        .bail()
        .isString().withMessage('content must be a string')
        .bail() 
        .trim()
        .isLength({ min: 1, max: 1000 }).withMessage('Content must be 1-1000 characters'),
    
    body('blogId')
        .bail()
        .notEmpty().withMessage('blogId is required')
        .bail()
        .isString().withMessage('blogId must be a string')
        .bail()
        .trim()
        .custom(async (value) => {
            const blogExists = await blogRepository.getBlogById(value)
            if (!blogExists) {
                throw new Error('Blog not found');
            }
            return true;
        }).withMessage('Blog not found')
];