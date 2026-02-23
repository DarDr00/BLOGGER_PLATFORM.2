import { Request, Response } from "express";
import { blogService } from "../../application/blogs.service";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { mapToBlogListPaginatedOutput } from "../mappers/map-to-blog-list-paginated-output.util";
import { BlogQueryInput } from "../input/blog-query.input";
import { setDefaultSortAndPaginationIfNotExist } from "../../../core/helpers/set-default-sort-and-pagination";
import { matchedData } from "express-validator";


export async function getBlogListHandler(
    req: Request<{}, {}, {}, any>,
    res: Response
) {
    try {

         const sanitizedQuery = matchedData(req, {
            locations: ['query'],
            includeOptionals: true,
        });

          const mappedQuery = {
      ...sanitizedQuery,
      searchBlogNameTerm: sanitizedQuery.searchNameTerm as string | undefined,
        };

        const queryInput = setDefaultSortAndPaginationIfNotExist(mappedQuery as BlogQueryInput);

        const { items, totalCount } = await blogService.findMany(queryInput);

        const blogListOutput = mapToBlogListPaginatedOutput(items, {
            page: queryInput.pageNumber!,
            pageSize: queryInput.pageSize!,
            totalCount
        });

    res.send(blogListOutput)

    } catch (e: unknown) {
        errorsHandler(e, res);
    }
};
