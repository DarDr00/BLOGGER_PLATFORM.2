import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { postRepository } from "../../repositories/post.repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";


export async function getPostListHandler(req: Request, res: Response) {
    try {
    const posts = await postRepository.getPostsAll();
    const postViewModel = posts.map(mapToPostViewModel)
    res.status(HttpStatus.OK_200).json(postViewModel);

    } catch (e: unknown) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500)
    }
};

