import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { postRepository } from "../../repositories/post.repository";


export async function deletePostHandler(req:Request<{id: string}>, res: Response) {
    try {
    const id = req.params.id;
    const post = await postRepository.getPostById(id);

    if (!post) {
        return res.status(HttpStatus.NOT_FOUND_404).send(
            createErrorMessages([{
                field: 'post',
                message: 'Post not found'
            }])
        );
    }

    await postRepository.deletePost(id);
    res.status(HttpStatus.NO_CONTENT_204).send();

} catch (e: unknown) {
    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500);
};
};