import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { blogService } from "../../application/blogs.service";
import { errorsHandler } from "../../../core/errors/errors.handler";

export async function deleteBlogHandler(req:Request<{id: string}>, res: Response) {
    try {
    const id = req.params.id;

    await blogService.delete(id);
    return res.status(HttpStatus.NO_CONTENT_204);

       } catch (e: unknown) {
        errorsHandler(e, res)
       }

}