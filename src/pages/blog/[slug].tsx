import { Sidebar } from '@/src/components'
import { calculateEstimatedTimeToRead } from '@/src/helpers/time.format'
import { BlogsType } from '@/src/interface/blogs.interface'
import { CategoriesType } from '@/src/interface/categories.interface'
import SEO from '@/src/layout/SEO/seo'
import { Layout } from '@/src/layout/layout'
import { BlogsService } from '@/src/services/blog.service'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import React from 'react'

const DetailedBlogsPage = ({ blog, latestBlogs, categories }: DetailedBlogsPageProps) => {
    return (
        <SEO metaTitle={blog.title}>
            <Layout>
                <Box sx={{ display: 'flex', gap: "20px", flexDirection: { xs: 'column', md: 'row' }, padding: '20px' }}>
                    <Box width={{ xs: '100%', md: '70%' }}>
                        <Box
                            sx={{
                                backgroundColor: 'black',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0px 8px 16px rgba(255, 255, 255, .1)'
                            }}
                            position={'relative'} width={'100%'} height={{ xs: '30vh', md: '60vh' }}
                        >
                            <Image src={blog.image.url} alt={blog.title} fill style={{ objectFit: 'cover', borderRadius: '10px' }} />
                        </Box>
                        <Box display={'flex'} flexDirection={'column'} rowGap={'10px'}>
                            <Box sx={{
                                display: 'flex',
                                gap: '10px',
                                marginTop: '30px'
                            }}>
                                <Avatar alt={blog.author.name} src={blog.author.avatar.url} />
                                <Box>
                                    <Typography>{blog.author.name}</Typography>
                                    <Box color={'gray'}>
                                        {format(new Date(blog.createdAt), 'dd MMM yyyy')} &#x2022;
                                        {calculateEstimatedTimeToRead(blog.description.text)} min read
                                    </Box>
                                </Box>
                            </Box>
                            <Typography variant='h3' marginTop={'10px'}>
                                {blog.title}
                            </Typography>
                            <Typography color={'gray'}>{blog.excerpt}</Typography>
                            <Divider />
                            <div style={{ opacity: '.8' }} dangerouslySetInnerHTML={{ __html: blog.description.html }} />
                        </Box>
                    </Box>
                    <Sidebar latestBlogs={latestBlogs} categories={categories} />
                </Box>
            </Layout>
        </SEO>
    )
}

export default DetailedBlogsPage

export const getServerSideProps: GetServerSideProps<DetailedBlogsPageProps> = async ({ query }) => {
    const blog = await BlogsService.getDetailedBlogs(query.slug as string);
    const latestBlogs = await BlogsService.getLatestBlog();
    const categories = await BlogsService.getCategories();

    return {
        props: {
            blog,
            latestBlogs,
            categories,
        }
    }
}

interface DetailedBlogsPageProps {
    blog: BlogsType;
    latestBlogs: BlogsType[];
    categories: CategoriesType[]
}
