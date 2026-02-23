import { Router } from "express";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";
import { idValidation } from "../../core/validation/params-id.validation-middleware";
import { postValidators } from "./post-validators";
import { createPostHandler } from "./handlers/create-post.handler";
import { getPostListHandler } from "./handlers/get-post.list";
import { getPostHandler } from "./handlers/get-post";
import { updatePostHandler } from "./handlers/update-post";
import { deletePostHandler } from "./handlers/delete-post";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import { PostSortField } from "../input/post-sort-field";

const postsRouter = Router({});

postsRouter

  .get('/', 
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    getPostListHandler,
  )

  .get('/:id', 
    idValidation, 
    inputValidationResultMiddleware, 
    getPostHandler)

  .post('/',
    superAdminGuardMiddleware,
    postValidators, 
    inputValidationResultMiddleware, 
    createPostHandler)

  .put('/:id', 
    superAdminGuardMiddleware,
    idValidation,  
    postValidators,
    inputValidationResultMiddleware, 
    updatePostHandler)

  .delete('/:id',
    superAdminGuardMiddleware,
    idValidation, 
    inputValidationResultMiddleware, 
    deletePostHandler);

  export default postsRouter;