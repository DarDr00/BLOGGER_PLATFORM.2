import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { blogRepository } from "../../repositories/blog.repository";
import { mapToBlogViewModel } from "../mappers/map-to-blog-output";


export async function getBlogListHandler(req: Request, res: Response) {
    try {
        const blogs = await blogRepository.getBlogsAll();
        const blogViewModels = blogs.map(mapToBlogViewModel);
    res.status(HttpStatus.OK_200).json(blogViewModels);

    } catch (e: unknown) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500)
    }
};
