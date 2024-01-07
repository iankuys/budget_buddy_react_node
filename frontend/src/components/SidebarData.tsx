import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import BookIcon from '@mui/icons-material/Book';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

export const SidebarData: {title: string, icon: any, link: string}[] = [
    
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/"
    },
    {
        title: "Dashboard",
        icon: <DashboardIcon />,
        link: "/dashboard"
    },
    {
        title: "Analytics",
        icon: <AnalyticsIcon />,
        link: "/analytics"
    },
    {
        title: "Planner",
        icon: <BookIcon />,
        link: "/planner"
    },
    {
        title: "Link Account",
        icon: <LoginIcon />,
        link: "/plaidLink"
    },
]