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
var DefaultCell_1 = require("../components/DefaultCell");
var StatusCell_1 = require("../components/StatusCell");
var DATA_TABLE_TOURNAMENT_GAMES = {
    columns: [
        {
            Header: "🃏 tournament",
            accessor: "tournament",
            width: "25%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "💵 buyin",
            accessor: "buyin",
            width: "12%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "💰 stack",
            accessor: "stack",
            width: "13%",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "👨‍👦‍👦 registered",
            accessor: "registered",
            width: "12%",
            align: "center",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "⏱️ starts in",
            accessor: "start",
            width: "13%",
            align: "center",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(DefaultCell_1["default"], { value: value });
            }
        },
        {
            Header: "status",
            accessor: "status",
            width: "25%",
            align: "center",
            Cell: function (_a) {
                var value = _a.value;
                return React.createElement(StatusCell_1["default"], { icon: "pending", color: "success", status: "Join" });
            }
        },
    ]
};
exports["default"] = DATA_TABLE_TOURNAMENT_GAMES;
