import { Router } from "express";
import { createPostHandler } from "./handlers/create-post.handler";
import { deletePostHandler } from "./handlers/delete-post";
import { getPostListHandler } from "./handlers/get-post.list";
import { getPostHandler } from "./handlers/get-post";
import { updatePostHandler } from "./handlers/update-post";
import { postValidators } from "../validation/posts.validators";
import { inputValidationResultMiddleware } from "../validation/inputValidationResultMiddleware";
import { idValidation } from "../../core/validation/params-id.validation-middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";

const postsRouter = Router({});

postsRouter

  .get('/', getPostListHandler)

  .get('/:id', idValidation, 
               inputValidationResultMiddleware, 
               getPostHandler)

  .post('/', superAdminGuardMiddleware, 
            postValidators, 
            inputValidationResultMiddleware, 
            createPostHandler)

  .put('/:id', superAdminGuardMiddleware, 
               idValidation, 
               postValidators, 
               inputValidationResultMiddleware, 
               updatePostHandler)

  .delete('/:id', superAdminGuardMiddleware, 
                  idValidation, 
                  inputValidationResultMiddleware, 
                  deletePostHandler);

  export default postsRouter;