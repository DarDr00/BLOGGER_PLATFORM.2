import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { blogRepository } from "../../repositories/blog.repository";
import { createErrorMessages } from "../../../core/utils/error.utils";

export async function deleteBlogHandler(req:Request<{id: string}>, res: Response) {
    try {
    const id = req.params.id;

    const blog = await blogRepository.getBlogById(id);

    if (!blog) {
        res.status(HttpStatus.NOT_FOUND_404).send(createErrorMessages([{ field: 'id', message: 'Blog not found'}]),
    );
    return;
    }

    await blogRepository.deleteBlog(id);
    return res.status(HttpStatus.NO_CONTENT_204).json()

       } catch (e: unknown) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500);
       }

}