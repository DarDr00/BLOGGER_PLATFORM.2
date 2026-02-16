import { WithId } from "mongodb";
import { Post } from "../../types/posts.types";
import { PostViewModel } from "../../types/post-view-model";


export function mapToPostViewModel(post: WithId<Post>): PostViewModel {
    if (!post) {
        throw new Error('Post is null or undefined');
    }
    
    if (!post._id) {
        throw new Error('Post has no _id');
    }
    
    const result = {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    };
    
    return result;
}