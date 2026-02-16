import { BlogViewModel } from "../../blogs/types/blog-view-model";

export type PostInputDto = {
   title: string,
   shortDescription: string,
   content: string,
   blogId: BlogViewModel['id'],
   blogName: string
};
