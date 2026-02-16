import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { blogRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-view-model";



export async function getBlogHandler(req:Request<{id: string}>, res: Response) {
    try {
    const id = req.params.id;
    const blog = await blogRepository.getBlogById(id)

    if (!blog) {
        res.status(HttpStatus.NOT_FOUND_404).send(createErrorMessages([{
            message: "Blog not found",
            field: "id"
        }]),
      );
      return;
    };
    const blogViewModel = mapToBlogViewModel(blog);
    return res.status(HttpStatus.OK_200).json(blogViewModel)
    
        } catch (e: unknown) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500)
        }
}
