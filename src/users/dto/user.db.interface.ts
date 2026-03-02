import { ObjectId } from "mongodb";

export type UserDBModel = {
    _id: ObjectId;
    login: string;
    email: string;
    passwordHash: string; 
    createdAt: Date; 
}