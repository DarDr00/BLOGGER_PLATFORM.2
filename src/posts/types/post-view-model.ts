import { BlogViewModel } from "../../blogs/types/blog-view-model";

export type PostViewModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: BlogViewModel['id'],
    blogName: string,
    createdAt: Date
};