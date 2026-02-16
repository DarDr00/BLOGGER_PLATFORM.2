import { validationResult, ValidationError } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/types/types";
import { error } from "node:console";

export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = validationResult(req);
    
    if (!result.isEmpty()) {
        const allErrors = result.array();

        const uniqueErrorsMap = new Map<string, string>();

        allErrors.forEach(error => {
            const field = (error as any).path || (error as any).param || 'field';
            const message = error.msg || 'Validation error';

            if (!uniqueErrorsMap.has(field)) {
                uniqueErrorsMap.set(field, message);
            }
        });

        const errors = Array.from(uniqueErrorsMap.entries()).map(([field, message]) => ({
            field,
            message
        }));
        
        return res.status(HttpStatus.BAD_REQUEST_400).json({ 
            errorsMessages: errors 
        });
    }

    next();
};