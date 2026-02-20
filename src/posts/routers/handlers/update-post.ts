import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { HttpStatus } from "../../../core/types/types";
import { createErrorMessages } from "../../../core/utils/error.utils";
import { PostInputDto } from "../../dtos/posts.input-dto";
import { postRepository } from "../../repositories/post.repository";
import { blogRepository } from "../../../blogs/repositories/blog.repository";

export async function updatePostHandler(req:Request<{id: string}, {}, PostInputDto>, res: Response, 
) {
    try { 
    const id = req.params.id;
    const postId = await postRepository.getPostById(id);

    if (!postId) {
        return res.status(HttpStatus.NOT_FOUND_404).send(
            createErrorMessages([{
                field: 'post',
                message: 'Post not found'
            }])
        );
    };

    const blogToUpdate = req.body.blogId;

    const blog = await blogRepository.getBlogById(blogToUpdate);
    
    if (!blog) {
        return res.status(HttpStatus.NOT_FOUND_404).send(
            createErrorMessages([{
                field: 'blogId',
                message: 'Blog not found'
            }])
        );
    }

    const updatePostData = {
    title: req.body.title,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
    blogName: blog.name,
    blogId: blogToUpdate,
    createdAt: postId.createdAt
    };

    const updateResult = await postRepository.updatePost(id, updatePostData);
    res.status(HttpStatus.NO_CONTENT_204).send();
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR_500)
    }
}