"use strict";
/* eslint-disable prettier/prettier */
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
var react_1 = require("react");
// @mui material components
var Card_1 = require("@mui/material/Card");
// Material Dashboard 2 PRO React TS components
var MDBox_1 = require("components/MDBox");
// Material Dashboard 2 PRO React TS examples components
var DataTable_1 = require("examples/Tables/DataTable");
// Data
var dataTableLeaderboard_1 = require("../../data/dataTableLeaderboard");
var GameProvider_1 = require("context/GameProvider");
var LeaderboardTable = function () {
    var _a = react_1.useState(null), menu = _a[0], setMenu = _a[1];
    var _b = GameProvider_1.useGame(), dailyRankData = _b.dailyRankData, monthlyRankData = _b.monthlyRankData;
    var _c = react_1.useState([]), dailyranklist = _c[0], setDailyranklist = _c[1];
    var _d = react_1.useState([]), monthlyranklist = _d[0], setMonthlyranklist = _d[1];
    var openMenu = function (event) { return setMenu(event.currentTarget); };
    var closeMenu = function () { return setMenu(null); };
    react_1.useEffect(function () {
        if (!dailyRankData) {
            setDailyranklist(dailyRankData);
        }
        if (!monthlyRankData) {
            setMonthlyranklist(monthlyRankData);
        }
    });
    return (React.createElement(MDBox_1["default"], { my: 3 },
        React.createElement(Card_1["default"], null,
            React.createElement(DataTable_1["default"], { tableColumns: dataTableLeaderboard_1["default"].columns, tableRows: dailyranklist, entriesPerPage: false, setLoading: undefined, loading: false }),
            React.createElement(DataTable_1["default"], { tableColumns: dataTableLeaderboard_1["default"].columns, tableRows: monthlyranklist, entriesPerPage: false, setLoading: undefined, loading: false }))));
};
exports["default"] = LeaderboardTable;
