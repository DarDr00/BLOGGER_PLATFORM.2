import { PostAttributes } from "../dtos/post-attributes";
import { postRepository } from "../repositories/post.repository";
import { blogRepository } from "../../blogs/repositories/blog.repository";
import { DomainError } from "../../core/errors/domain.error";
import { BlogErrorCode } from "../../blogs/application/blogs.service";
import { Post } from "../domain/post";
import { WithId } from "mongodb";
import { PostQueryInput } from "../input/post-query.input";

export enum PostErrorCode {
  NotFound = 'POST_NOT_FOUND',
  BlogNotFound = 'BLOG_NOT_FOUND',
  Forbidden = 'POST_ACCESS_FORBIDDEN',
  InvalidData = 'POST_INVALID_DATA'
}

export const postsService = {
          async findMany(
              queryDto: PostQueryInput,
          ): Promise<{ items: WithId<Post>[]; totalCount: number}> {
              return postRepository.findMany(queryDto);
          },
  
          async findPostsbyBlog(
              queryDto: PostQueryInput,
              blogId: string,
          ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
            await blogRepository.findByIdOrFail(blogId);
            return postRepository.findPostsByBlog(queryDto, blogId);
          },
          
          async findByIdOrFail(id: string): Promise<WithId<Post>> {
              return postRepository.findByIdOrFail(id);
          },
  
          async create(dto: PostAttributes): Promise<string> {
            const blog = await blogRepository.findByIdOrFail(dto.blogId);

            const newPost: Post = {
                  title: dto.title,
                  shortDescription: dto.shortDescription,
                  content: dto.content,
                  blogId: dto.blogId,
                  blogName: blog.name,
                  createdAt: new Date()
              };
  
              return await postRepository.createPost(newPost);
          },
  
          async update(id: string, dto: PostAttributes): Promise<void> {
              await postRepository.updatePost(id, dto)
              return;
          },
  
          async delete(id: string): Promise<void> {
              await postRepository.deletePost(id);
              return;
          }
  
      }
  