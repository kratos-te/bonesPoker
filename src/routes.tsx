/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts

// Material Dashboard 2 PRO React TS components

// @mui icons
import Icon from "@mui/material/Icon";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// Images
import TournamentOverview from "layouts/dashboards/tournaments";
import Leaderboards from "layouts/dashboards/leaderboards";
import Tables from "layouts/dashboards/tables";
import Twitter from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { FaDiscord } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Basic from "layouts/authentication/sign-in";
import Start from "layouts/authentication/starting-board";
import { BsSuitSpadeFill, BsSuitClubFill } from "react-icons/bs";
import MyProfile from "layouts/authentication/my-profile";

import Leaderboard from "components/Leaderbaord/Leaderboard";

//set routes here

const routes = [
  // { type: "title", title: "Poker", key: "title-pages" },
  {
    key: "home",
    route: "/signup",
    component: <Basic />,
  },
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <HomeIcon fontSize="medium" />,
    noCollapse: true,
    route: "/home",
    component: <Start />,
  },
  {
    type: "collapse",
    name: "Table Games",
    key: "tablegames",
    icon: <BsSuitSpadeFill></BsSuitSpadeFill>,
    noCollapse: true,
    route: "/tablegames",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Tournaments",
    key: "tournaments",
    icon: <BsSuitClubFill></BsSuitClubFill>,
    noCollapse: true,
    route: "/tournaments",
    component: <TournamentOverview />,
  },
  {
    type: "collapse",
    name: "Leaderboards",
    key: "leaderboards",
    icon: <EmojiEventsIcon fontSize="medium">militarytech</EmojiEventsIcon>,
    noCollapse: true,
    route: "/leaderboards",
    component: <Leaderboards></Leaderboards>,
  },
  { type: "divider", key: "divider-1" },
  {
    type: "collapse",
    name: "My Profile",
    key: "myprofile",
    icon: <PersonIcon fontSize="medium" />,
    noCollapse: true,
    route: "/myprofile",
    component: <MyProfile />,
  },
  { type: "divider", key: "divider-2" },
  //{ type: "title", title: "Docs", key: "title-docs" },
  {
    type: "collapse",
    name: "Twitter",
    key: "twitter",
    icon: <Twitter fontSize="medium">Twitter</Twitter>,
    noCollapse: true,
    href: "https://twitter.com/bonesdao",
  },
  {
    type: "collapse",
    name: "Discord",
    key: "discord",
    icon: <FaDiscord />,
    noCollapse: true,
    href: "https://t.co/q1yq87wZ3s",
  },
  {
    type: "collapse",
    name: "Magic Eden",
    key: "magiceden",
    icon: <FaShoppingCart />,
    noCollapse: true,
    href: "https://magiceden.io/marketplace/bone_voyage",
  },
];

export default routes;
