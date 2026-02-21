import { Request, Response } from 'express';
import { postsService } from '../../../posts/application/post.service';
import { errorsHandler } from '../../../core/errors/errors.handler';
import { matchedData } from 'express-validator';
import { CreatePostDto } from '../input/create-post.dto';


export async function createPostForBlogHandler(
    req: Request<{ blogId: string }, {}, CreatePostDto>,
    res: Response
) {
    try {
        const blogId = req.params.blogId;
        const postData = matchedData(req, { 
            locations: ['body'] 
        }) as CreatePostDto;

        const newPost = await postsService.createPostForBlog(blogId, postData);

        res.status(201).json(newPost);
    } catch (error) {
        errorsHandler(error, res);
    }
}