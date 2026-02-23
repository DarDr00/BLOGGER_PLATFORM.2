import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/types";
import { mapToPostListPaginatedOutput } from "../mappers/map-to-post-list-paginated-output.util";
import { PostQueryInput } from "../../input/post-query.input";
import { postsService } from "../../application/post.service";
import { setDefaultSortAndPaginationIfNotExist } from "../../../core/helpers/set-default-sort-and-pagination";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { matchedData } from "express-validator";


export async function getPostListHandler(
    req: Request<{}, {}, {}, PostQueryInput>,
    res: Response
) {
    try {
        const sanitizedQuery = matchedData<PostQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        });

        const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

        const { items, totalCount } = await postsService.findMany(queryInput);

        const postListOutput = mapToPostListPaginatedOutput(items, {
            page: queryInput.pageNumber!,
            pageSize: queryInput.pageSize!,
            totalCount: totalCount,
        });

    res.send(postListOutput)

    } catch (e: unknown) {
        errorsHandler(e, res);
    }
};

