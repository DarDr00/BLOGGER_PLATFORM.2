import { WithId } from "mongodb";
import { Post } from "../../domain/post";
import { PostViewModel } from "../output/post.output";
import { Paginator } from "../../../core/types/pagination-and-sorting";
import { mapToPostOutputUtil } from "./map-to-post-output.util";

export function mapToPostListPaginatedOutput(
    items: WithId<Post>[],
    params: {
        page: number;
        pageSize: number;
        totalCount: number;
    }
): Paginator<PostViewModel> {
    return {
        pagesCount: Math.ceil(params.totalCount / params.pageSize),
        page: params.page,
        pageSize: params.pageSize,
        totalCount: params.totalCount,
        items: items.map(mapToPostOutputUtil)
    };
}