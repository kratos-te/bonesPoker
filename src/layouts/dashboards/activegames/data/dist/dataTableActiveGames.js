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
/* eslint-disable react/prop-types */
// ProductsList page components
var DefaultCell_1 = require("../components/DefaultCell");
var StatusCell_1 = require("../components/StatusCell");
var GameCell_1 = require("../components/GameCell");
// const DataTableActivegames = {
var DATA_TABLE_ACTIVE_GAMES = {
    columns: [
        {
            Header: "🃏 name",
            accessor: "name",
            width: "25%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(GameCell_1["default"], { value: value });
            }
        },
        {
            Header: "💵 amount",
            accessor: "amount",
            width: "15%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "💵 stack",
            accessor: "stack",
            width: "15%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "💵 blinds",
            accessor: "blinds",
            width: "15%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "💵 token",
            accessor: "token",
            width: "15%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "👨‍👦‍👦 player",
            accessor: "player",
            width: "20%",
            align: "center",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        // {
        //   Header: "⏱️ starts in",
        //   accessor: "start",
        //   width: "15%",
        //   Cell: ({ value }: any) => <DefaultCell value={value} />,
        // },
        {
            Header: "status",
            accessor: "status",
            width: "25%",
            align: "center",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(StatusCell_1["default"], { icon: "pending", color: "success", status: "Go to table" });
            }
        },
    ]
};
// [
//   {
//     activegames: "🃏 Bone Voyage Free Roller",
//     buyin: "💵 FR Ticket",
//     status: "free",
//     stack: "💰 1,000",
//     blinds: "25/50",
//     registered: " 123",
//     start: "✔️ started",
//   },
//   {
//     activegames: "🃏 Jelly Special",
//     buyin: "💵 25 $JELLY",
//     status: "free",
//     stack: "💰 1,000",
//     blinds: "25/50",
//     registered: " 97",
//     start: "✔️ started",
//   },
//   {
//     activegames: "🃏 Monday Turbo",
//     buyin: "💵 0.2 $SOL",
//     status: "free",
//     stack: "💰 1,000",
//     blinds: "25/50",
//     registered: " 44",
//     start: "✔️ started",
//   },
//   {
//     activegames: "🃏 Bone Voyage Free Roller",
//     buyin: "💵 FR Ticket",
//     status: "free",
//     stack: "💰 1,500",
//     blinds: "50/100",
//     registered: " 35",
//     start: "⏱️ 33 min",
//   },
// ],
exports["default"] = DATA_TABLE_ACTIVE_GAMES;
