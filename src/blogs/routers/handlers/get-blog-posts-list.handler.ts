import { Request, Response } from "express";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { PostQueryInput } from "../../../posts/input/post-query.input";
import { postsService } from "../../../posts/application/post.service";
import { mapToPostListPaginatedOutput } from "../../../posts/routers/mappers/map-to-post-list-paginated-output.util";
import { matchedData } from "express-validator";
import { setDefaultSortAndPaginationIfNotExist } from "../../../core/helpers/set-default-sort-and-pagination";


export async function getBlogPostsListHandler(
  req: Request<{ id: string }, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const BlogId = req.params.id;

const sanitizedQuery = matchedData<PostQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });

    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const { items, totalCount } = await postsService.findPostsbyBlog(
      queryInput,
      BlogId,
    );

    const postListOutput = mapToPostListPaginatedOutput(items, {
        page: queryInput.pageNumber!,
        pageSize: queryInput.pageSize!,
        totalCount: totalCount,
    });
    res.send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
