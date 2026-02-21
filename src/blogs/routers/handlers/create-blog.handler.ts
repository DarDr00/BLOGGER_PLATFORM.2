import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToBlogOutput } from "../mappers/map-to-blog-output";
import { blogService } from "../../application/blogs.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { BlogCreateInput } from "../input/blog-create.input";
import { BlogAttributes } from "../../application/dtos/blog-attributes";
import { BlogInputDto } from "../../dto/blogs.input-dto";

export async function createBlogHandler(
  req: Request<{}, {}, BlogInputDto>, 
  res: Response,
) {
  try {
    
    const createdBlogId = await blogService.create(req.body);
    
    const createdBlog = await blogService.findByIdOrFail(createdBlogId);

    const blogOutput = mapToBlogOutput(createdBlog);

    return res.status(HttpStatus.CREATED_201).json(blogOutput);
    
  } catch (e: unknown) {
    errorsHandler(e, res);
    };
  };