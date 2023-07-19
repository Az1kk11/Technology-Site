import { Content } from '@/src/components'
import { BlogsType } from '@/src/interface/blogs.interface'
import SEO from '@/src/layout/SEO/seo'
import { Layout } from '@/src/layout/layout'
import { BlogsService } from '@/src/services/blog.service'
import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import React from 'react'

const BlogPage = ({ blogs }: BlogPageProps) => {
    return (
        <SEO metaTitle='All Blogs'>
        <Layout>
            <Box sx={{
                display: 'flex',
                gap: "20px",
                flexDirection: { xs: 'column', md: 'row' },
                padding: '20px',
                marginTop:'12vh',
                justifyContent: 'center'
            }}>
                <Content blogs={blogs} />
            </Box>
        </Layout>
        </SEO>
    )
}

export default BlogPage

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async () => {
    const blogs = await BlogsService.getAllBlogs()
    return {
        props: { blogs }
    }
}

interface BlogPageProps {
    blogs: BlogsType[];
}