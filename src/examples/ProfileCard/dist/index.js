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
// @mui material components
var Grid_1 = require("@mui/material/Grid");
var Twitter_1 = require("@mui/icons-material/Twitter");
var ProfileInfoCard_1 = require("examples/Cards/InfoCards/ProfileInfoCard");
// Overview page components
// Data
var userData_1 = require("layouts/authentication/userData");
// Images
var material_1 = require("@mui/material");
var GameProvider_1 = require("context/GameProvider");
function ProfileCard() {
    var _a = GameProvider_1.useGame(), userName = _a.userName, userPfp = _a.userPfp, userAddress = _a.userAddress;
    return (React.createElement(Grid_1["default"], { container: true, spacing: 1 },
        React.createElement(Grid_1["default"], { item: true, xs: 12, md: 6, xl: 12, sx: { display: "flex" } },
            React.createElement(material_1.Card, { id: "basic-info", sx: { overflow: "visible" } },
                React.createElement(ProfileInfoCard_1["default"], { title: userName, description: userData_1["default"].user1.description, wallet: userAddress, discord: userData_1["default"].user1.discord, level: userData_1["default"].user1.level, social: [
                        {
                            link: "https://twitter.com/creativetim",
                            icon: React.createElement(Twitter_1["default"], null),
                            color: "twitter"
                        },
                    ], shadow: false })))));
}
exports["default"] = ProfileCard;
