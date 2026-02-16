import { ObjectId } from "mongodb"

export type BlogAttributes = {
    _id: ObjectId;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: Date;
    isMembership: boolean;
}