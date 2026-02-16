import { errors } from "undici-types";
import { ValidationError } from "../../blogs/types/validationError";


export const createErrorMessages = (errors : ValidationError[], 
): { errorMessages: ValidationError[] } => {
    return { errorMessages: errors };
};

