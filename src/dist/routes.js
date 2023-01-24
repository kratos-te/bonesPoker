"use strict";
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
exports.__esModule = true;
var EmojiEvents_1 = require("@mui/icons-material/EmojiEvents");
// Images
var tournaments_1 = require("layouts/dashboards/tournaments");
var leaderboards_1 = require("layouts/dashboards/leaderboards");
var tables_1 = require("layouts/dashboards/tables");
var Twitter_1 = require("@mui/icons-material/Twitter");
var Home_1 = require("@mui/icons-material/Home");
var Person_1 = require("@mui/icons-material/Person");
var fa_1 = require("react-icons/fa");
var fa_2 = require("react-icons/fa");
var sign_in_1 = require("layouts/authentication/sign-in");
var starting_board_1 = require("layouts/authentication/starting-board");
var bs_1 = require("react-icons/bs");
var my_profile_1 = require("layouts/authentication/my-profile");
//set routes here
var routes = [
    // { type: "title", title: "Poker", key: "title-pages" },
    {
        key: "home",
        route: "/signup",
        component: React.createElement(sign_in_1["default"], null)
    },
    {
        type: "collapse",
        name: "Home",
        key: "home",
        icon: React.createElement(Home_1["default"], { fontSize: "medium" }),
        noCollapse: true,
        route: "/home",
        component: React.createElement(starting_board_1["default"], null)
    },
    {
        type: "collapse",
        name: "Table Games",
        key: "tablegames",
        icon: React.createElement(bs_1.BsSuitSpadeFill, null),
        noCollapse: true,
        route: "/tablegames",
        component: React.createElement(tables_1["default"], null)
    },
    {
        type: "collapse",
        name: "Tournaments",
        key: "tournaments",
        icon: React.createElement(bs_1.BsSuitClubFill, null),
        noCollapse: true,
        route: "/tournaments",
        component: React.createElement(tournaments_1["default"], null)
    },
    {
        type: "collapse",
        name: "Leaderboards",
        key: "leaderboards",
        icon: React.createElement(EmojiEvents_1["default"], { fontSize: "medium" }, "militarytech"),
        noCollapse: true,
        route: "/leaderboards",
        component: React.createElement(leaderboards_1["default"], null)
    },
    { type: "divider", key: "divider-1" },
    {
        type: "collapse",
        name: "My Profile",
        key: "myprofile",
        icon: React.createElement(Person_1["default"], { fontSize: "medium" }),
        noCollapse: true,
        route: "/myprofile",
        component: React.createElement(my_profile_1["default"], null)
    },
    { type: "divider", key: "divider-2" },
    //{ type: "title", title: "Docs", key: "title-docs" },
    {
        type: "collapse",
        name: "Twitter",
        key: "twitter",
        icon: React.createElement(Twitter_1["default"], { fontSize: "medium" }, "Twitter"),
        noCollapse: true,
        href: "https://twitter.com/bonesdao"
    },
    {
        type: "collapse",
        name: "Discord",
        key: "discord",
        icon: React.createElement(fa_1.FaDiscord, null),
        noCollapse: true,
        href: "https://t.co/q1yq87wZ3s"
    },
    {
        type: "collapse",
        name: "Magic Eden",
        key: "magiceden",
        icon: React.createElement(fa_2.FaShoppingCart, null),
        noCollapse: true,
        href: "https://magiceden.io/marketplace/bone_voyage"
    },
];
exports["default"] = routes;
