import { blogRepository } from "../repositories/blog.repository";
import { WithId } from "mongodb";
import { Blog } from "../domain/blog";
import { postRepository } from "../../posts/repositories/post.repository";
import { DomainError } from "../../core/errors/domain.error";
import { BlogAttributes } from "./dtos/blog-attributes";
import { BlogQueryInput } from "../routers/input/blog-query.input";
import { Paginator } from "../../core/types/pagination-and-sorting";
import { PostQueryInput } from "../../posts/input/post-query.input";
import { PostViewModel } from "../../posts/routers/output/post.output";
import { ResourceType } from "../../core/types/resource-type";
import { PostSortField } from "../../posts/input/post-sort-field";
import { SortDirection } from "../../core/types/sort-direction";
import { BlogInputDto } from "../dto/blogs.input-dto";
import { BlogUpdateInput } from "../routers/input/blog-update.input";

    export enum BlogErrorCode {
  NotFound = 'BLOG_NOT_FOUND',
  AlreadyExists = 'BLOG_ALREADY_EXISTS',  
  Forbidden = 'BLOG_ACCESS_FORBIDDEN',    
  InvalidData = 'BLOG_INVALID_DATA',      
}

    export const blogService = {
        async findMany(
            queryDto: BlogQueryInput,
        ): Promise<{ items: WithId<Blog>[]; totalCount: number}> {
            return blogRepository.findMany(queryDto);
        },

        async findByIdOrFail(id: string): Promise<WithId<Blog>> {
            return blogRepository.findByIdOrFail(id);
        },

        async findPostsForBlog(
            blogId: string,
            queryDto: PostQueryInput    
        ): Promise<Paginator<PostViewModel>> {
            const blog = await blogRepository.findByIdOrFail(blogId);
            const posts = await postRepository.findPostsByBlog(blogId, queryDto);


    return {
        pagesCount: posts.pagesCount,
        page: posts.page,
        pageSize: posts.pageSize,
        totalCount: posts.totalCount,
        items: posts.items.map(post => ({
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: blog._id.toString(),  
            blogName: blog.name,     
            createdAt: post.createdAt.toISOString(),      
            }))
          };
        },  

        async create(dto: BlogInputDto): Promise<string> {
            const newBlog: Blog = {
                name: dto.name,
                description: dto.description,
                websiteUrl: dto.websiteUrl,
                createdAt: new Date(),
                isMembership: false,
            };

            const createdId = await blogRepository.createBlog(newBlog);
            return createdId;
        },

        async update(id: string, dto: BlogUpdateInput): Promise<void> {
            await blogRepository.updateBlog(id, dto);
            return;
        },

        async delete(id: string): Promise<void> {
             const posts = await postRepository.findPostsByBlog(id, { 
            pageNumber: 1, 
            pageSize: 1,
            sortBy: PostSortField.CreatedAt,  
            sortDirection: SortDirection.Desc 
        });
  
        if (posts.items.length > 0) {
         throw new DomainError(
         'Cannot delete blog with existing posts',
         BlogErrorCode.Forbidden
        );
       }
  
        await blogRepository.deleteBlog(id);
            return;
        }
    }

