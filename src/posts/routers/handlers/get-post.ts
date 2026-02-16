import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { postRepository } from "../../repositories/post.repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";

export async function getPostHandler(req:Request<{id: string}>, res: Response) {
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
    };

    const postViewModel = mapToPostViewModel(post);
    return res.status(HttpStatus.OK_200).json(postViewModel)

        } catch (e: unknown) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500)
        }

}
