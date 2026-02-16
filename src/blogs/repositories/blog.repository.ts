import { Blog } from "../types/blogs.types";
import { BlogInputDto } from "../dto/blogs.input-dto";
import { getBlogCollection } from "../../db/mongo.db";
import { ObjectId, WithId } from "mongodb";

export const blogRepository = {
    async getBlogsAll(): Promise<WithId<Blog>[]> {
        return getBlogCollection().find().toArray();
    },

    async getBlogById(id: string): Promise<WithId<Blog> | null> {
        return getBlogCollection().findOne({ _id: new ObjectId(id) });
    },

    async createBlog(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await getBlogCollection().insertOne(newBlog);
        return { _id: insertResult.insertedId, ...newBlog };
    },

    async updateBlog(id: string, dto: BlogInputDto): Promise<void> {
        const updateResult = await getBlogCollection().updateOne(
        { 
            _id: new ObjectId(id),
        },
        {
            $set: {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl
            },
        },
    )

    if (updateResult.matchedCount < 1) {
        throw new Error('Blog not exist');
    }
   return;
},
    async deleteBlog(id: string): Promise<void> {
        const deleteResult = await getBlogCollection().deleteOne({
            _id: new ObjectId(id),
        });
        if (deleteResult.deletedCount < 1) {
            throw new Error('Blog not exist');
        }
        return;
    },
};