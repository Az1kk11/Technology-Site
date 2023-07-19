import { navItem } from '@/src/config/constants'
import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import React, { Fragment } from 'react'
import { SidebarProps } from './sidebar.props'
import { useRouter } from 'next/router'

export const Sidebar = ({ latestBlogs, categories }: SidebarProps) => {
    const router = useRouter()
    return (
        <Box width={{ xs: '100%', md: '30%' }}>
            <Box position={'sticky'} top={'100px'}>
                <Box padding={'20px'} border={'1px solid gray'} borderRadius={'8px'}>
                    <Typography variant='h5'>Latest blog</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                        {latestBlogs.map(item => (
                            <Box key={item.id} onClick={() => router.push(`/blog/${item.slug}`)} sx={{ cursor: 'pointer' }} marginTop={'20px'}>
                                <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                    <Image src={item.image.url} alt={item.title} width={100} height={100} style={{ objectFit: 'cover', borderRadius: '8px' }} />
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <Typography variant='body1'>{item.title}</Typography>
                                        <Box sx={{ display: 'flex', gap: '10px', fontSize: '14px' }}>
                                            <Avatar alt={item.author.name} src={item.author.avatar.url} />
                                            <Box sx={{ opacity: '0.8' }}>
                                                <Typography variant='body2'>{item.author.name}</Typography>
                                                <Box>{format(new Date(item.createdAt), 'dd MMM yyyy')}</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider sx={{ marginTop: '20px' }} />
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box padding={'20px'} border={'1px solid gray'} marginTop={'20px'} borderRadius={'8px'}>
                    <Typography variant='h5'>Category</Typography>
                    <Box sx={{ display: 'flex', flexDirection: "column", marginTop: '20px' }}>
                        {categories.map(item => (
                            <Fragment key={item.slug}>
                                <Button
                                    onClick={() => router.push(`/category/${item.slug}  `)}
                                    fullWidth sx={{ justifyContent: 'flex-start', height: '50px' }}
                                >
                                    {item.label}
                                </Button>
                                <Divider />
                            </Fragment>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}