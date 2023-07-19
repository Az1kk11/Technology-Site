import 'react-multi-carousel/lib/styles.css'
import { Avatar, Box, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import Carousel from 'react-multi-carousel';
import { format } from 'date-fns';
import { HeroProps } from './hero.props';
import { calculateEstimatedTimeToRead } from '@/src/helpers/time.format';

export const Hero = ({ blogs }: HeroProps) => {
    return (
        <Box width={'100%'} height={'100vh'}>
            <Carousel
                responsive={{
                    mobile: {
                        breakpoint: { max: 4000, min: 0 },
                        items: 1
                    }
                }}
            >
                {blogs.map(item => (
                    <Box key={item.id}>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '100vh',
                        }}>
                            <Image
                                src={item.image.url}
                                alt={item.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, .6)'
                            }}
                            />
                            <Box
                                width={{ xs: '100%', md: '70%' }}
                                position={'relative'}
                                color={'white'}
                                sx={{
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    paddingLeft: { xs: '10px', md: '50px' }
                                }}
                                zIndex={500}
                            >
                                <Typography sx={{ fontSize: { sx: '30px', md: '50px' } }}>{item.title}</Typography>
                                <Typography sx={{ fontSize: { sx: '20px', md: '30px' }, color: 'gray' }}>{item.excerpt}</Typography>
                                <Box sx={{
                                    display: 'flex',
                                    gap: '10px',
                                    marginTop: '20px'
                                }}>
                                    <Avatar
                                        src={item.author.avatar.url}
                                        alt={item.author.name}
                                        sx={{ width: { xs: '40px', md: '45px' }, height: { xs: '40px', md: '45px' }, marginTop: { xs: '4px', md: '2px' } }} />
                                    <Box >
                                        <Typography>{item.author.name}</Typography>
                                        <Box>
                                            {format(new Date(item.createdAt), 'dd MMM yyyy')} &#x2022;
                                            {calculateEstimatedTimeToRead(item.description.text)} min read
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                ))}
            </Carousel>
        </Box>
    )
}