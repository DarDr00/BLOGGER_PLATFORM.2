import { ResourceType } from "../../../core/types/resource-type";
import { BlogInputDto } from "../../dto/blogs.input-dto";

export type BlogCreateInput = {
    data: {
        type: ResourceType.Blogs;
        attributes: BlogInputDto;
    }
}