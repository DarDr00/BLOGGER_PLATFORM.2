import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { blogService } from "../../application/blogs.service";
import { BlogUpdateInput } from "../input/blog-update.input";
import { errorsHandler } from "../../../core/errors/errors.handler";

export async function updateBlogHandler(
    req:Request<{id: string}, {}, BlogUpdateInput>, 
    res: Response, 
) {
    try {
    const id = req.params.id;

    await blogService.update(id, req.body.data.attributes);
    res.sendStatus(HttpStatus.NO_CONTENT_204)
    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}