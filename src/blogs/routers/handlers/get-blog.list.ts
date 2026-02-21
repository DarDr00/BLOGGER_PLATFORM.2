import { Request, Response } from "express";
import { blogService } from "../../application/blogs.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { mapToBlogListPaginatedOutput } from "../mappers/map-to-blog-list-paginated-output.util";
import { BlogQueryInput } from "../input/blog-query.input";
import { setDefaultSortAndPaginationIfNotExist } from "../../../core/helpers/set-default-sort-and-pagination";
import { matchedData } from "express-validator";


export async function getBlogListHandler(
    req: Request<{}, {}, {}, BlogQueryInput>,
    res: Response
) {
    try {

        const sanitizedQuery = matchedData<BlogQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        });

        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

        const { items, totalCount } = await blogService.findMany(queryInput);

        const blogListOutput = mapToBlogListPaginatedOutput(items, {
            page: queryInput.pageNumber!,
            pageSize: queryInput.pageSize!,
            totalCount: totalCount,
            pagesCount: totalCount
        });

    res.send(blogListOutput)

    } catch (e: unknown) {
        errorsHandler(e, res);
    }
};
