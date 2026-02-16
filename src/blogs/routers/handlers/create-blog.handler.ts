import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { Blog } from "../../domain/blog";
import { blogRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-output";
import { BlogCreateInput } from "../input/blog-create.input";
import { blogService } from "../../application/blogs.service";

export async function createBlogHandler(
  req: Request<{}, {}, BlogCreateInput>, 
  res: Response,
) {
  try {
    const createdBlogId = await blogService.create(
      req.body.data.attributes
    );
    const createDriver = await blogService.findByIdOrFail(createdBlogId);
    const driverOutput = map
    
    return res.status(HttpStatus.CREATED_201).json(blogViewModel);
    
  } catch (e: unknown) {
    console.error('💥 CREATE BLOG ERROR:', e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
}