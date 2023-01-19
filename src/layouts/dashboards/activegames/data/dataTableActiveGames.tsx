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

import DefaultCell from "../components/DefaultCell";
import StatusCell from "../components/StatusCell";
import GameCell from "../components/GameCell";

const dataTableActivegames = {
  columns: [
    {
      Header: "🃏 Active Games",
      accessor: "activegames",
      width: "25%",
      Cell: ({ value }: any) => <GameCell value={value} />,
    },
    {
      Header: "💵 buyin",
      accessor: "buyin",
      width: "15%",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "👨‍👦‍👦 registered",
      accessor: "registered",
      width: "20%",
      align: "center",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "⏱️ starts in",
      accessor: "start",
      width: "15%",
      Cell: ({ value }: any) => <DefaultCell value={value} />,
    },
    {
      Header: "status",
      accessor: "status",
      width: "25%",
      align: "center",
      Cell: ({ value }: any) => <StatusCell icon="pending" color="success" status="Go to table" />,
    },
  ],

  rows: [
    {
      activegames: "🃏 Bone Voyage Free Roller",
      buyin: "💵 FR Ticket",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: " 123",
      start: "✔️ started",
    },
    {
      activegames: "🃏 Jelly Special",
      buyin: "💵 25 $JELLY",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: " 97",
      start: "✔️ started",
    },
    {
      activegames: "🃏 Monday Turbo",
      buyin: "💵 0.2 $SOL",
      status: "free",
      stack: "💰 1,000",
      blinds: "25/50",
      registered: " 44",
      start: "✔️ started",
    },
    {
      activegames: "🃏 Bone Voyage Free Roller",
      buyin: "💵 FR Ticket",
      status: "free",
      stack: "💰 1,500",
      blinds: "50/100",
      registered: " 35",
      start: "⏱️ 33 min",
    },
  ],
};

export default dataTableActivegames;
