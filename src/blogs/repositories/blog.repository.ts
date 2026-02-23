import { Blog } from "../domain/blog";
import { BlogInputDto } from "../dto/blogs.input-dto";
import { blogCollection } from "../../db/mongo.db";
import { ObjectId, WithId } from "mongodb";
import { BlogAttributes } from "../application/dtos/blog-attributes";
import { BlogQueryInput } from "../routers/input/blog-query.input";
import { RepositoryNotFoundError } from "../../core/errors/ropository-not-found.error";
import { BlogUpdateInput } from "../routers/input/blog-update.input";

export const blogRepository = {
    async findMany(
        queryDto: BlogQueryInput,
    ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        
        const {
            pageNumber = 1,
            pageSize = 10,
            sortBy = 'createdAt',
            sortDirection = 'desc',
            searchBlogNameTerm,
            searchBlogDescriptionTerm,
            searchBlogWebsiteUrlTerm,
            filterBlogCreatedAtTerm,
            filterBlogIsMembershipTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter : any = {};

        if (searchBlogNameTerm) {
            filter.name = { $regex: searchBlogNameTerm, $options: 'i' };
        } 

        if (searchBlogDescriptionTerm) {
            filter.description = { $regex: searchBlogDescriptionTerm, $options: 'i' };
        } 

        if (searchBlogWebsiteUrlTerm) {
            filter.websiteUrl = { $regex: searchBlogWebsiteUrlTerm, $options: 'i' };
        } 

        if (filterBlogIsMembershipTerm !== undefined) {
            filter.isMembership = filterBlogIsMembershipTerm;
        }
        
        if (filterBlogCreatedAtTerm) {
            const date = new Date(filterBlogCreatedAtTerm);
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            filter.createdAt = {
                $gte: date,
                $lt: nextDay
            };
        }

        const items = await blogCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1
             })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);

            return { items, totalCount };
        },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },

    async findByIdOrFail(id: string): Promise<WithId<Blog>> {
        const res = await blogCollection.findOne({ _id: new ObjectId(id) });

        if (!res) {
            throw new RepositoryNotFoundError('Blog not exist');
        }
        return res;
    },

    async createBlog(newBlog: Blog): Promise<string> {
        const insertResult = await blogCollection.insertOne(newBlog);
        return insertResult.insertedId.toString();
    },

    async updateBlog(id: string, dto: BlogUpdateInput): Promise<void> {
        const updateResult = await blogCollection.updateOne(
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
        throw new RepositoryNotFoundError('Blog not exist');
    }
   return;
},
    async deleteBlog(id: string): Promise<void> {
        const deleteResult = await blogCollection.deleteOne({
            _id: new ObjectId(id),
        });
        if (deleteResult.deletedCount < 1) {
            throw new RepositoryNotFoundError('Blog not exist');
        }
        return;
    },
};