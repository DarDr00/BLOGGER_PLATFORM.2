import { Response } from "express";
import { RepositoryNotFoundError } from "./ropository-not-found.error";
import { HttpStatus } from "../types/types";
import { createErrorMessages } from "../utils/error.utils";
import { DomainError } from "./domain.error";

export function errorsHandler(error: unknown, res: Response): void {
    if (error instanceof RepositoryNotFoundError) {
        res.status(HttpStatus.NOT_FOUND_404).send(
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
        const field = error.source || 'unknown';

        res.status(HttpStatus.UNPROCESSABLE_ENTITY_422).send(
            createErrorMessages([
                {
                    message: error.message,
                    field: field,
                },
            ]),
        );
        return;
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).send(
        createErrorMessages([
            {
                message: 'Internal server error',
                field: 'server',
            },
        ]),
    );
}