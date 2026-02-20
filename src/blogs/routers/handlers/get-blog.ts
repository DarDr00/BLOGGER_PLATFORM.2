import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToBlogOutput } from "../mappers/map-to-blog-output";
import { blogService } from "../../application/blogs.service";
import { errorsHandler } from "../../../core/errors/errors.handler";



export async function getBlogHandler(
    req:Request<{id: string}>, 
    res: Response
) {
    try {
    const id = req.params.id;
    const blog = await blogService.findByIdOrFail(id);

    const blogOutput = mapToBlogOutput(blog);
    res.status(HttpStatus.OK_200).send(blogOutput);
    
        } catch (e: unknown) {
            errorsHandler(e, res);
    }
}
