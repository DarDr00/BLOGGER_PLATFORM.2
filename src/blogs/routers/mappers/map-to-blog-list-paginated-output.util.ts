import { WithId } from "mongodb";
import { Blog } from "../../domain/blog";
import { BlogViewModel } from "../output/blog.view-model";
import { Paginator } from "../../../core/types/pagination-and-sorting";
import { mapToBlogOutput } from "./map-to-blog-output";

export function mapToBlogListPaginatedOutput(
    items: WithId<Blog>[],
    params: {
        page: number;
        pageSize: number;
        totalCount: number;
    }
): Paginator<BlogViewModel> {
    return {
        pagesCount: Math.ceil(params.totalCount / params.pageSize), 
        page: params.page,
        pageSize: params.pageSize,
        totalCount: params.totalCount,
        items: items.map(mapToBlogOutput) 
    };
}