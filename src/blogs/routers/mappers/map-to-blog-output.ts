import { WithId } from "mongodb";
import { Blog } from "../../domain/blog";
import { DriverOu}
import { BlogViewModel } from "../../types/blog-view-model";

export function mapToBlogViewModel(blog: WithId<Blog>): BlogViewModel {
    
    if (!blog || !blog._id) {
        throw new Error('Invalid blog object');
    }
    
    const viewModel = {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    };
    
    return viewModel;
}
