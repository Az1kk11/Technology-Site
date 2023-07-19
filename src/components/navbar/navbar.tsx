import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu'
import { navItem } from 'src/config/constants';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material'

interface Props {
    window?: () => Window;
}

const drawerWidth = 300

export const Navbar = ({ window }: Props) => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen(prevState => !prevState);
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: '20px' }}>
                <Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: '5px' }} >
                    <Image src={'/erl-tech-favicon.png'} alt='logo' width={30} height={30} />
                    <Typography
                        variant='h5'
                        component={"div"}
                        fontFamily={'initial'}
                    >
                        Technology
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List>
                {navItem.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => router.push(item.route)} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{ backgroundColor: 'rgba(0, 0, 0, 0.10)', height: '12vh' }} component={'nav'}>
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box
                        sx={{
                            my: 2,
                            alignItems: 'center',
                            gap: '5px',
                            flexGrow: 1,
                            display: 'flex',
                            cursor: 'pointer',
                        }}
                        onClick={() => router.push('/')}
                    >
                        <Image src={'/erl-tech-favicon.png'} alt='logo' width={50} height={50} />
                        <Typography
                            variant='h4'
                            component={"div"}
                            fontFamily={'initial'}
                        >
                            Technology
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItem.map((item, index) => (
                            <Button onClick={() => router.push(item.route)} key={index} sx={{ color: '#fff' }}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>

            <Box component={'nav'}>
                <Drawer
                    container={container}
                    variant='temporary'
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { sx: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: `${drawerWidth}` }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    )
}