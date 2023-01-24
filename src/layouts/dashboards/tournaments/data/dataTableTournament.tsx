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

const DATA_TABLE_TOURNAMENT_GAMES = {
  columns: [
    {
      Header: "🃏 tournament",
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
      Header: "⏱️ starts in",
      accessor: "start",
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

  // rows: [
  //   {
  //     tournament: "🃏 BV Free Roller",
  //     buyin: "💵 FR Ticket",
  //     status: "free",
  //     stack: "💰 1,000",
  //     blinds: "25/50",
  //     registered: "123",
  //     start: "⏱️ 5 min",
  //   },
  //   {
  //     tournament: "🃏 Jelly Special",
  //     buyin: "💵 25 $JELLY",
  //     status: "free",
  //     stack: "💰 1,000",
  //     blinds: "25/50",
  //     registered: "97",
  //     start: "⏱️ 24 min",
  //   },
  //   {
  //     tournament: "🃏 Monday Turbo",
  //     buyin: "💵 0.2 $SOL",
  //     status: "free",
  //     stack: "💰 1,000",
  //     blinds: "25/50",
  //     registered: "44",
  //     start: "⏱️ 28 min",
  //   },
  //   {
  //     tournament: "🃏 BV Free Roller",
  //     buyin: "💵 FR Ticket",
  //     status: "free",
  //     stack: "💰 1,500",
  //     blinds: "50/100",
  //     registered: "35",
  //     start: "⏱️ 33 min",
  //   },
  //   {
  //     tournament: "🃏 Get $Bonkers",
  //     buyin: "💵 5,000 $BONK",
  //     status: "free",
  //     stack: "💰 1,000",
  //     blinds: "25/50",
  //     registered: "76",
  //     start: "⏱️ 38 min",
  //   },
  //   {
  //     tournament: "🃏 High Roller Club",
  //     buyin: "💵 5 $SOL",
  //     status: "free",
  //     stack: "💰 500",
  //     blinds: "10/20",
  //     registered: "64",
  //     start: "⏱️ 45 min",
  //   },
  //   {
  //     tournament: "🃏 Breadcrumbs",
  //     buyin: "💵 0.1 $SOL",
  //     status: "free",
  //     stack: "💰 1,000",
  //     blinds: "25/50",
  //     registered: "34",
  //     start: "⏱️ 50 min",
  //   },
  // ],
};

export default DATA_TABLE_TOURNAMENT_GAMES;
