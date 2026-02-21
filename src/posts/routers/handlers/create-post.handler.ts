import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToPostOutputUtil } from "../mappers/map-to-post-output.util";
import { PostCreateInput } from "../../input/post-create.input";
import { postsService } from "../../application/post.service";
import { errorsHandler } from "../../../core/errors/errors.handler";

export async function createPostHandler(
    req:Request<{}, {}, PostCreateInput>, 
    res: Response
) { 
    try {
        const createdPostId = await postsService.create(req.body.data.attributes);

        const createdPost = await postsService.findByIdOrFail(createdPostId);

        const postOutput = mapToPostOutputUtil(createdPost);

        return res.status(HttpStatus.CREATED_201).send(postOutput);
        
    } catch (e: unknown) {
        errorsHandler(e, res);
    }
}