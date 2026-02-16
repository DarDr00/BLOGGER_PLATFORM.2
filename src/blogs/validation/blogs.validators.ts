import { body } from 'express-validator';

export const blogValidators = [
    body('name')
        .bail()
        .notEmpty().withMessage('name is required')
        .bail()
        .isString().withMessage('name must be a string')
        .bail()
        .trim()
        .isLength({ min: 1, max: 15 }).withMessage('name must be 1-15 characters'),
    
    body('description')
        .bail()
        .notEmpty().withMessage('description is required')
        .bail()
        .isString().withMessage('description must be a string')
        .bail()
        .trim()
        .isLength({ min: 1, max: 500 }).withMessage('description must be 1-500 characters'),
    
     body('websiteUrl')
       .bail()
       .trim()
       .isURL({ require_tld: true, protocols: ['https'] })
       .withMessage('websiteUrl must be a valid HTTPS URL')
];