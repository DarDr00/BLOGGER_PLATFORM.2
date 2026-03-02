import { Router } from "express";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import { UserSortField } from "../dto/users.queryFields.type";
import { getUsersHandler } from "./handlers/get-user-list.handler";
import { UserValidators } from "../api/middlewares/users.validators";
import { createUserHandler } from "./handlers/create-user.handler";
import { deleteUserHandler } from "./handlers/delete-user.handler";


export const usersRouter = Router({});

usersRouter
  .get('/', 
    baseAuthGuard,
    paginationAndSortingValidation(UserSortField), 
    inputValidationResultMiddleware,
    getUsersHandler
  )
  .post('/',  
    baseAuthGuard,
    UserValidators,
    inputValidationResultMiddleware, 
    createUserHandler
  )
  .delete('/:id', 
    baseAuthGuard,
    deleteUserHandler
  );

export default usersRouter;