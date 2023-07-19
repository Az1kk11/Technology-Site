import { BlogsType } from "@/src/interface/blogs.interface";
import { CategoriesType } from "@/src/interface/categories.interface";

export interface SidebarProps {
    latestBlogs: BlogsType[];
    categories: CategoriesType[];
}