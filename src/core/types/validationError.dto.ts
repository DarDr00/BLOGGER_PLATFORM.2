import { HttpStatus } from "./types";

export type ValidationErrorListOutput = {
    message: string | null; 
    field: string | null;
}

export type APIErrorResult = {
    errorsMessages: ValidationErrorListOutput[] | null;  
};