import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { postsService } from "../../application/post.service";
import { errorsHandler } from "../../../core/errors/errors.handler";


export async function deletePostHandler(
    req:Request<{id: string}, {}, {}>, 
    res: Response
) {
    try {
    const id = req.params.id;

    await postsService.delete(id);
    res.status(HttpStatus.NO_CONTENT_204);

} catch (e: unknown) {
    errorsHandler(e, res);
};
};