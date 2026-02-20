import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToPostOutputUtil } from "../mappers/map-to-post-output.util";
import { PostCreateInput } from "../../input/post-create.input";
import { postS}

export async function createPostHandler(req:Request<{id: string}, {}, PostInputDto>, res: Response) {
    
    try {
        const blog = await blogRepository.getBlogById(req.body.blogId);
        
        if (!blog) {
            return res.status(HttpStatus.NOT_FOUND_404).send(
                createErrorMessages([{
                    field: 'blogId',
                    message: 'Blog not found'
                }])
            );
        }

        const newPost: Post = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: blog.name,
            createdAt: new Date()
        };

        const createdPost = await postRepository.createPost(newPost);
        const postViewModel = mapToPostViewModel(createdPost);

        return res.status(HttpStatus.CREATED_201).json(postViewModel);
        
    } catch (e: unknown) {
        return res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500);
    }
}