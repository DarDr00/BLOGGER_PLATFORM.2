import { 
    FieldValidationError, 
    ValidationError,
    validationResult
} from "express-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationErrorType } from "../../types/validationError";
import { HttpStatus } from "../../types/types";
import { ValidationErrorListOutput } from "../../types/validationError.dto";
import { APIErrorResult } from "../../types/api-error.types";

const formatValidationError = (error: any): ValidationErrorListOutput => {
  const expressError = error as FieldValidationError;
  
  return {
    message: expressError.msg,  
    field: expressError.path,   
  };
};

export const createErrorMessages = (
  errors: ValidationErrorListOutput[],
): APIErrorResult => {
  return {
    errorsMessages: errors.map((error) => ({
      message: error.message,
      field: error.field,
    })),
  };
};

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errors = validationResult(req)
    .formatWith(formatValidationError)
    .array({ onlyFirstError: true });

  if (errors.length > 0) {
    res.status(HttpStatus.BAD_REQUEST_400).json(createErrorMessages(errors));
    return;
  }
  next();
};