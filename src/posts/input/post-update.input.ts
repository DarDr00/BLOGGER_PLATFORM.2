import { ResourceType } from "../../core/types/resource-type";
import { PostAttributes } from "../dtos/post-attributes";

export type PostUpdateInput = {
    data: {
        type: ResourceType.Posts;
        id: string;
        attributes: PostAttributes;
    };
};