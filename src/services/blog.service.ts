import { gql, request } from "graphql-request"
import { BlogsType } from "../interface/blogs.interface"
import { CategoriesType } from "../interface/categories.interface"

const graphqAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string

export const BlogsService = {
    async getAllBlogs() {
        const query = gql`
        query GetBlogs {
            blogs {
                excerpt
                id
                slug
                title
                createdAt
                image {
                    url
                }
                author {
                    name
                    id
                avatar {
                        url
                    }
                }
                category {
                    label
                    slug
                }
                description {
                    text
                }
            }
        }`
        const result = await request<{ blogs: BlogsType[] }>(graphqAPI, query);
        return result.blogs;
    },

    async getLatestBlog() {
        const query = gql`
        query GetBlogs {
            blogs(last: 2) {
                id
                slug
                title
                createdAt
                image {
                    url
                }
                description {
                    text
                }
                author {
                    name
                avatar {
                        url
                    }
                }
            }
        }`
        const result = await request<{ blogs: BlogsType[] }>(graphqAPI, query);
        return result.blogs
    },

    async getCategories() {
        const query = gql`
            query GetCategories{
                categories {
                    slug
                    label
                }
            }
        `
        const result = await request<{ categories: CategoriesType[] }>(graphqAPI, query)
        return result.categories
    },

    async getDetailedBlogs(slug: string) {
        const query = gql`
            query GetDetailedBlog($slug: String!) {
                blog(where: {slug: $slug}) {
                    excerpt
                id
                slug
                title
                createdAt
                image {
                    url
                }
                author {
                    name
                    id
                avatar {
                        url
                    }
                }
                category {
                    label
                    slug
                }
                description {
                    html
                    text
                }
                }
            }
        `;

        const result = await request<{ blog: BlogsType }>(graphqAPI, query, { slug });
        return result.blog;
    },

    async getDetailedCategoriesBlog(slug: string) {
        const query = gql`
            query MyQuery($slug: String!) {
                blogs(where: {category: {slug: $slug}}) {
                    excerpt
                    id
                    slug
                    title
                    createdAt
                    image {
                        url
                    }
                    author {
                        name
                        id
                    avatar {
                        url
                        }
                    }
                    category {
                        label
                        slug
                    }
                    description {
                        text
                    }
                }
            }
        `;
        const result = await request<{ blogs: BlogsType[] }>(graphqAPI, query, { slug })
        return result.blogs
    }
} 