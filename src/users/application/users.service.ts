import { WithId } from "mongodb";
import { DomainError } from "../../core/errors/domain.error";
import { Paginator } from "../../core/types/pagination-and-sorting";
import { ResourceType } from "../../core/types/resource-type";
import { SortDirection } from "../../core/types/sort-direction";
import { UserQueryInput } from "../dto/user.query.input";
import { User } from "../dto/user.service.interface";
import { userCollection } from "../../db/mongo.db";
import { UserRepository } from "../repositories/user.repository";
import { UserInputModel } from "../dto/create-user.dto";
import { UserSortField } from "../dto/users.queryFields.type";

    export enum UserErrorCode {
  NotFound = 'USER_NOT_FOUND',
  AlreadyExists = 'USER_ALREADY_EXISTS',  
  Forbidden = 'USER_ACCESS_FORBIDDEN',    
  InvalidData = 'USER_INVALID_DATA',      
}

    export const userService = {
        async findMany(
            queryDto: UserQueryInput,
        ): Promise<{ items: WithId<User>[]; totalCount: number}> {
            return UserRepository.findMany(queryDto);
        },


        async create(dto: UserInputModel): Promise<string> {
            const existing = await UserRepository.findByLoginOrEmail(dto.login);
            
            if (existing) {
                throw new DomainError(
            'User with this login or email already exists',
            'USER_EXISTS'
            )};
            
            const newUser: User = {
                login: dto.login,
                email: dto.email,
                passwordHash,
                createdAt: new Date(),
            };

            const createdId = await UserRepository.create(newUser);
            return createdId;
        },

        async delete(id: string): Promise<boolean> {
             const user = await UserRepository.findById(id);
  
        if (!user) return false;
  
        return UserRepository.delete(id);
            
        }
    }

