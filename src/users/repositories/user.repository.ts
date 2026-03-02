import { ObjectId, WithId } from "mongodb";
import { userCollection } from "../../db/mongo.db";
import { User } from "../dto/user.service.interface";
import { RepositoryNotFoundError } from "../../core/errors/ropository-not-found.error";
import { UserQueryInput } from "../dto/user.query.input";


export const UserRepository = {

    async create(newUser: User): Promise<string> {
        const insertedResult = await userCollection.insertOne(newUser);
        return insertedResult.insertedId.toString();
    },

    async delete(id: string): Promise<boolean> {
        const deletedResult = await userCollection.deleteOne({
            _id: new ObjectId(id),
        });
        if (deletedResult.deletedCount < 1) {
            throw new RepositoryNotFoundError('User not exist');
        };
        return deletedResult.deletedCount === 1;
    },

    async findMany(queryDto: UserQueryInput): Promise<{ items: WithId<User>[]; totalCount: number }> {
         const {
            pageNumber = 1,
            pageSize = 10,
            sortBy = 'createdAt',
            sortDirection = 'desc',
            searchEmailTerm,
            searchLoginTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter : any = {};

        if (searchEmailTerm) {
            filter.email = { $regex: searchEmailTerm, $options: 'i' };
        }

        if (searchLoginTerm) {
            filter.login = { $regex: searchLoginTerm, $options: 'i' };
        }

        const items = await userCollection
                    .find(filter)
                    .sort({ [sortBy]: sortDirection === 'asc' ? 1 : -1
                     })
                    .skip(skip)
                    .limit(pageSize)
                    .toArray();
        
                const totalCount = await userCollection.countDocuments(filter);
        
                    return { items, totalCount };

    },
    
    async findById(id: string): Promise<WithId<User> | null> {
        return userCollection.findOne({
            _id: new ObjectId(id),
        })

    },

    async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<User> | null> {
        return userCollection.findOne({
            $or: [{ email: loginOrEmail}, { login: loginOrEmail }]
        });
    },
}






