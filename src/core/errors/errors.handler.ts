import { Response } from "express";
import { RepositoryNotFoundError } from "./ropository-not-found.error";
import { HttpStatus } from "../types/types";
import { createErrorMessages } from "../utils/error.utils";
import { DomainError } from "./domain.error";

export function errorsHandler(error: unknown, res: Response): void {
    if (error instanceof RepositoryNotFoundError) {
        const httpStatus = HttpStatus.NOT_FOUND_404;

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    message: error.message,
                    field: 'id',
                },
            ]),
        );
        return;
    
    }

    if (error instanceof DomainError) {
        const httpStatus = HttpStatus.UNPROCESSABLE_ENTITY_422;

        const field = error.source || 'unknown';

        res.status(httpStatus).send(
            createErrorMessages([
                {
                    message: error.message,
                    field: field,
                },
            ]),
        );

        return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500);
    return;

}