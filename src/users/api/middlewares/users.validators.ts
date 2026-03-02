import { body } from 'express-validator';
import { UserRepository } from '../../repositories/user.repository';

export const UserValidators = [
    body('email')
        .bail()
        .isEmail().withMessage("email is not correct")
        .bail()
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)
        .withMessage('email must match pattern example@example.dev')
        .bail()
        .normalizeEmail()
        .custom(async (email) => {
            const user = await UserRepository.findByLoginOrEmail(email);
            if (user) {
                throw new Error('Email already exists');
            }
            return true;
        }),
    
    body('password')
        .bail()
        .isString().withMessage('password must be a string')
        .bail()
        .trim()
        .isLength({ min: 6, max: 20 }).withMessage('password is not correct'),
    
     body('login')
        .isString().withMessage('login must be a string')
        .bail()
        .trim()
        .isLength({ min: 3, max: 10 }).withMessage('login must be 3-10 characters')
        .bail()
        .matches(/^[a-zA-Z0-9_-]*$/).withMessage('login can only contain letters, numbers, underscore and hyphen')
        .bail()
        .custom(async (login: string) => {
        const user = await UserRepository.findByLoginOrEmail(login);
        if (user) {
            throw new Error('login already exists');
        }
        return true;
    }),

    body("loginOrEmail")
    .isString()
    .trim()
    .isLength({min: 1, max: 500})
    .withMessage("loginOrEmail is not correct")
];