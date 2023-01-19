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

/* eslint-disable react/prop-types */
// ProductsList page components

import Icon from "@mui/material/Icon";
import DefaultCell from "../components/DefaultCell";
import StatusCell from "../components/StatusCell";

const dataTableTable = {
  columns: [
    {
      Header: "🃏 table game",
      accessor: "tournament",
      width: "25%",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "💵 buyin",
      accessor: "buyin",
      width: "12%",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "💰 stack",
      accessor: "stack",
      width: "13%",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "👨‍👦‍👦 registered",
      accessor: "registered",
      width: "12%",
      align: "center",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "⚫ blinds",
      accessor: "blinds",
      width: "13%",
      align: "center",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "status",
      accessor: "status",
      width: "25%",
      align: "center",
      Cell: ({ value }: any) => <StatusCell icon="pending" color="success" status="Join" />,
    },
  ],

  rows: [
    {
      tournament: "🃏 Heads Up Turbo",
      buyin: "💵 0.1 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "1/2",
      start: "⏱️ 5 min",
    },
    {
      tournament: "🃏 Heads Up Turbo",
      buyin: "💵 0.5 SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "0/2",
      start: "⏱️ 24 min",
    },
    {
      tournament: "🃏 Heads Up Turbo",
      buyin: "💵 0.2 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "0/2",
      start: "⏱️ 28 min",
    },
    {
      tournament: "🃏 Heads Up Turbo",
      buyin: "💵 1 $SOL",
      status: "free",
      stack: "💰 1,500",
      blinds: "50/100",
      registered: "1/2",
      start: "⏱️ 33 min",
    },
    {
      tournament: "🃏 Triple Threat",
      buyin: "💵 25 $JELLY",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "2/3",
      start: "⏱️ 38 min",
    },
    {
      tournament: "🃏 Triple Threat",
      buyin: "💵 5 $SOL",
      status: "free",
      stack: "💰 500",
      blinds: "10/20",
      registered: "1/3",
      start: "⏱️ 45 min",
    },
    {
      tournament: "🃏 Triple Threat",
      buyin: "💵 0.1 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "0/3",
      start: "⏱️ 50 min",
    },
    {
      tournament: "🃏 10 Player Turbo",
      buyin: "💵 5 $SOL",
      status: "free",
      stack: "💰 500",
      blinds: "10/20",
      registered: "7/10",
      start: "⏱️ 45 min",
    },
    {
      tournament: "🃏 10 Player Turbo",
      buyin: "💵 0.1 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "5/10",
      start: "⏱️ 50 min",
    },
    {
      tournament: "🃏 10 Player Turbo",
      buyin: "💵 5 $SOL",
      status: "free",
      stack: "💰 500",
      blinds: "10/20",
      registered: "9/10",
      start: "⏱️ 45 min",
    },
    {
      tournament: "🃏 5 Out Slow",
      buyin: "💵 0.1 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "3/5",
      start: "⏱️ 50 min",
    },
    {
      tournament: "🃏 5 Out Slow",
      buyin: "💵 5 $SOL",
      status: "free",
      stack: "💰 500",
      blinds: "10/20",
      registered: "4/5",
      start: "⏱️ 45 min",
    },
    {
      tournament: "🃏 5 Out Slow",
      buyin: "💵 0.1 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: "1/5",
      start: "⏱️ 50 min",
    },
  ],
};

export default dataTableTable;
