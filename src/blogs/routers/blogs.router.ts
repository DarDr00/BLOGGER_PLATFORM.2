import { Router } from "express";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog";
import { getBlogListHandler } from "./handlers/get-blog.list";
import { getBlogHandler } from "./handlers/get-blog";
import { updateBlogHandler } from "./handlers/update-blog";
import { blogValidators } from "../validation/blogs.validators";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { idValidation } from "../../core/validation/params-id.validation-middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard-middleware";
import { paginationAndSortingValidation } from "../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import { BlogSortField } from "./input/blog-sort.field";

export const blogsRouter = Router({});

blogsRouter.use(superAdminGuardMiddleware);

blogsRouter
  .get('/', 
    paginationAndSortingValidation(BlogSortField), 
    inputValidationResultMiddleware,
    getBlogListHandler
  )
  .get('/:id', 
    idValidation, 
    inputValidationResultMiddleware, 
    getBlogHandler
  )
  .post('/',  
    blogValidators,
    inputValidationResultMiddleware, 
    createBlogHandler
  )
  .put('/:id', 
    superAdminGuardMiddleware, 
    idValidation, 
    blogValidators,
    inputValidationResultMiddleware, 
    updateBlogHandler
  )
  .delete('/:id', 
    superAdminGuardMiddleware, 
    idValidation, 
    inputValidationResultMiddleware, 
    deleteBlogHandler
  );

export default blogsRouter;