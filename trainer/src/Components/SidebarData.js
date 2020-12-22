import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import BuildIcon from '@material-ui/icons/Build';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MailIcon from '@material-ui/icons/Mail';
import Home from "./Home"
import ChooseTotalTime from './ChooseTotalTime';
import Overview from './Overview';
import LikedTrains from './LikedTrains';
import ContactUs from './ContactUs';

export const SidebarData = [{
    title: "Home",
    icon: <HomeIcon />,
    link: "/home",
    component: Home
},
{
    title: "Overview",
    icon: <HistoryIcon />,
    link: "/overview",
    component: Overview
},
{
    title: "Create Your Train",
    icon: <BuildIcon />,
    link: "/ChooseTotalTime",
    component: ChooseTotalTime
},
{
    title: "Liked Trains",
    icon: <FavoriteIcon />,
    link: "/likedTrains",
    component: LikedTrains
},
{
    title: "Contact Us",
    icon: <MailIcon />,
    link: "/contactUs",
    component: ContactUs
}
]