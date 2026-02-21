import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { postsService } from "../../application/post.service";
import { PostUpdateInput } from "../../input/post-update.input";
import { errorsHandler } from "../../../core/errors/errors.handler";

export async function updatePostHandler(
    req:Request<{id: string}, {}, PostUpdateInput>, 
    res: Response, 
) {
    try {
    const id = req.params.id;

    await postsService.update(id, req.body.data.attributes);
    res.sendStatus(HttpStatus.NO_CONTENT_204)
    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}