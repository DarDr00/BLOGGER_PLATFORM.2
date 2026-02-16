import { BlogViewModel } from "../../blogs/types/blog-view-model";

export type Post = {
   title: string,
   shortDescription: string,
   content: string,
   blogId: BlogViewModel['id'],
   blogName: string,
   createdAt: Date
};