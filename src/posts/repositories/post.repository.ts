import { ObjectId, WithId } from "mongodb";
import { PostInputDto } from "../dto/posts.input-dto";
import { getPostCollection } from "../../db/mongo.db";
import { Post } from "../types/posts.types";


export const postRepository = {
    async getPostsAll(): Promise<WithId<Post>[]> {
        return getPostCollection().find().toArray();
    },

    async getPostById(id: string): Promise<WithId<Post> | null> {
        return getPostCollection().findOne({ _id: new ObjectId(id) });
    },

    async createPost(newPost: Post): Promise<WithId<Post>> {
        const insertResult = await getPostCollection().insertOne(newPost);
        return { ...newPost, _id: insertResult.insertedId };
    },

    async updatePost(id: string, dto: PostInputDto): Promise<void> {
        const updateResult = await getPostCollection().updateOne(
        { 
            _id: new ObjectId(id),
        },
        {
            $set: {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId
            },
        },
    )

    if (updateResult.matchedCount < 1) {
        throw new Error('Post not exist');
    }
   return;
},
    async deletePost(id: string): Promise<void> {
        const deleteResult = await getPostCollection().deleteOne({
            _id: new ObjectId(id),
        });
        if (deleteResult.deletedCount < 1) {
            throw new Error('Post not exist');
        }
        return;
    },
};