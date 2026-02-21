import { Request, Response } from "express";
import { errorsHandler } from "../../../core/errors/errors.handler";
import { PostQueryInput } from "../../../posts/input/post-query.input";
import { postsService } from "../../../posts/application/post.service";
import { mapToPostListPaginatedOutput } from "../../../posts/routers/mappers/map-to-post-list-paginated-output.util";

export async function getBlogPostsListHandler(
  req: Request<{ id: string }, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const BlogId = req.params.id;
    const queryInput = req.query;

    const { items, totalCount } = await postsService.findPostsbyBlog(
      queryInput,
      BlogId,
    );

    const postListOutput = mapToPostListPaginatedOutput(items, {
        page: queryInput.pageNumber!,
        pageSize: queryInput.pageSize!,
        totalCount: totalCount,
        pagesCount: totalCount
    });
    res.send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
