import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { BlogInputDto } from "../../dto/blogs.input-dto";
import { blogRepository } from "../../repositories/blog.repository";

export async function updateBlogHandler(req:Request<{id: string}, {}, BlogInputDto>, res: Response, 
) {
    try {
    const id = req.params.id;
    const blog = await blogRepository.getBlogById(id);

    if (!blog) {
        res.status(HttpStatus.NOT_FOUND_404).send(createErrorMessages([{
            message: "Blog not found",
            field: "id"
        }]),
      );
      return;
    };

    await blogRepository.updateBlog(id, req.body);
    res.status(HttpStatus.NO_CONTENT_204).send();
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500)
    }
}