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
import { postValidators } from "../../posts/routers/post-validators";
import { createPostForBlogHandler } from "./handlers/create-post-for-blog.handler";
import { PostSortField } from "../../posts/input/post-sort-field";
import { getBlogPostsListHandler } from "./handlers/get-blog-posts-list.handler";

export const blogsRouter = Router({});

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
  .get('/:id/posts',
    idValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    getBlogPostsListHandler
    )
  .post('/',  
    superAdminGuardMiddleware,
    blogValidators,
    inputValidationResultMiddleware, 
    createBlogHandler
  )
  .post('/:id/posts',
    superAdminGuardMiddleware,
    idValidation,
    postValidators,
    inputValidationResultMiddleware,
    createPostForBlogHandler
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