import { ResourceType } from "../../../core/types/resource-type";

export type PostDataOutput = {
    type: ResourceType.Posts;
    id: string;
    attributes: {
        title: string;
        shortDescription: string;
        content: string;
        Blog: {
            id: string;
            name: string;
        };
        createdAt: Date;
    };
};