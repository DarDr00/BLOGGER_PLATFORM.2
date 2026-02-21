import { Post } from "../../domain/post";
import { ResourceType } from "../../../core/types/resource-type";
import { PostListPaginatedOutput } from "../output/post-list-paginated.output";
import { PostDataOutput } from "../output/post-data.output";
import { WithId } from "mongodb";

export function mapToPostListPaginatedOutput(
    posts: WithId<Post>[],
    meta: { pagesCount: number; page: number; pageSize: number; totalCount: number },
    blogInfo?: { id: string; name: string }
): PostListPaginatedOutput {
    return {
        pagesCount: meta.pagesCount,
        page: meta.page,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: posts.map((post) => {
            const blogId = blogInfo?.id || post.blogId;
            const blogName = blogInfo?.name || post.blogName;
            
            return {
                id: post._id.toString(),
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: blogId,
                blogName: blogName,
                createdAt: post.createdAt
            };
        }),
    };
}