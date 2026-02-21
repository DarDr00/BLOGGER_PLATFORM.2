import { HttpStatus } from "./types";

export type ValidationErrorType = {
    message: string | null;
    field: string | null;
};

export type APIErrorResult = {
    errorsMessages: ValidationErrorType[] | null;
}