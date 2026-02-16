import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { Post } from "../../types/posts.types";
import { PostInputDto } from "../../dto/posts.input-dto";
import { postRepository } from "../../repositories/post.repository";
import { blogRepository } from "../../../blogs/repositories/blog.repository";
import { mapToPostViewModel } from "../mappers/map-to-post-view-model";

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