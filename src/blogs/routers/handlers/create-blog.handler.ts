import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { Blog } from "../../types/blogs.types";
import { BlogInputDto } from "../../dto/blogs.input-dto";
import { blogRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model";

export async function createBlogHandler(req: Request, res: Response) {
  try {
    const newBlog: Blog = {
      name: req.body.name.trim(),
      description: req.body.description.trim(),
      websiteUrl: req.body.websiteUrl.trim(),
      createdAt: new Date(),
      isMembership: false
    };

    const createdBlog = await blogRepository.createBlog(newBlog);
    const blogViewModel = mapToBlogViewModel(createdBlog);
    
    return res.status(HttpStatus.CREATED_201).json(blogViewModel);
    
  } catch (e: unknown) {
    console.error('💥 CREATE BLOG ERROR:', e);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR_500).json({
      error: 'Internal Server Error',
      message: 'Something went wrong'
    });
  }
}