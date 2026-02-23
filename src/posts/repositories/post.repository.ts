import { Post } from "../domain/post";
import { postCollection } from "../../db/mongo.db";
import { ObjectId, WithId } from "mongodb";
import { RepositoryNotFoundError } from "../../core/errors/ropository-not-found.error";
import { PostQueryInput } from "../input/post-query.input";
import { PostCreateInput } from "../input/post-create.input";
import { PostUpdateInput } from "../input/post-update.input";

export const postRepository = {
    async findMany(
        queryDto: PostQueryInput,
    ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
              const {
                  pageNumber = 1,
                  pageSize = 10,
                  sortBy = 'createdAt',
                  sortDirection = 'desc',
              } = queryDto;
      
              const filter : any = {};
              const skip = (pageNumber - 1) * pageSize;
              
              const [items, totalCount] = await Promise.all([
                postCollection
                .find(filter)
                .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
                .skip(skip)
                .limit(pageSize)
                .toArray(),
                postCollection.countDocuments(filter),
              ]);
                return { items, totalCount } ;
              },
      
          async findPostsByBlog(
            blogId: string,
            queryDto: PostQueryInput,
          ): Promise<{ items: WithId<Post>[];    
            pagesCount: number;
            page: number;
            pageSize: number;
            totalCount: number }> {
              const { pageNumber = 1, pageSize = 10, sortBy = 'createdAt', sortDirection = 'desc'} = queryDto;
              
                const items = await postCollection
            .find({ blogId })
            .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1 })
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray();
    
            const totalCount = await postCollection.countDocuments({ blogId });
            return {
            items,
            totalCount,
            pagesCount: Math.ceil(totalCount / pageSize),
            page: pageNumber,
            pageSize
           };
          },
          
          async findById(id: string): Promise<WithId<Post> | null> {
              return postCollection.findOne({ _id: new ObjectId(id) });
          },
      
          async findByIdOrFail(id: string): Promise<WithId<Post>> {
              const res = await postCollection.findOne({ _id: new ObjectId(id) });
      
              if (!res) {
                  throw new RepositoryNotFoundError('Post not exist');
              }
              return res;
          },
      
          async createPost(newPost: Post): Promise<string> {
              const insertResult = await postCollection.insertOne(newPost);
              return insertResult.insertedId.toString();
          },
      
          async updatePost(id: string, dto: PostUpdateInput ): Promise<void> {
              const updateResult = await postCollection.updateOne(
              { 
                  _id: new ObjectId(id),
              },
              {
                  $set: {
                  title: dto.title,
                  shortDescription: dto.shortDescription,
                  blogId: dto.blogId,
                  content: dto.content
                  },
              },
          )
      
          if (updateResult.matchedCount < 1) {
              throw new RepositoryNotFoundError(`Post with id ${id} not found`);
          }
         return;
      },

          async deletePost(id: string): Promise<void> {
              const deleteResult = await postCollection.deleteOne({
                  _id: new ObjectId(id),
              });
              if (deleteResult.deletedCount < 1) {
                  throw new RepositoryNotFoundError('Post not exist');
              }
              return;
          },
      };