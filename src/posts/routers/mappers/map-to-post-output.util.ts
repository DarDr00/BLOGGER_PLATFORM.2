import { WithId } from "mongodb";
import { Post } from "../../domain/post";
import { ResourceType } from "../../../core/types/resource-type";
import { PostOutput } from "../output/post.output";
import { PostDataOutput } from "../output/post-data.output";

export function mapToPostOutputUtil(post: WithId<Post>): PostOutput {
   const data: PostDataOutput = {
        type: ResourceType.Posts,
        id: post._id.toString(),
        attributes: {
               title: post.title,
               shortDescription: post.shortDescription,
               content: post.content,
               Blog: {
                id: post.blogId,
                name: post.blogName
               },
               createdAt: post.createdAt,
        }
    };
    return { data };
}