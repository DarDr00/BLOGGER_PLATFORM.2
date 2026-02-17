import { APIErrorResult, FieldError } from "../types/api-error.types";


export const createErrorMessages = (errors: { message: string; field: string }[] | null
): APIErrorResult => {
    return {
        errorsMessages: errors?.map(error => ({
            message: error.message,
            field: error.field,
        })) || null
    };
}

