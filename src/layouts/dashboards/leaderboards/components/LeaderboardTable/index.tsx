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

import { FC, useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS examples components
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableLeaderboard from "../../data/dataTableLeaderboard";
import RankShowPanel from "components/Leaderbaord/RankShowPanel";
import { useGame } from "context/GameProvider";

interface LeaderboardTemplate {
  rank: string;
  player: string;
  solwon: number;
  gameswon: number;
  winrate: number;
  level: number;
}

const LeaderboardTable: FC = () => {
  const [menu, setMenu] = useState(null);
  const { dailyRankData, monthlyRankData } = useGame();
  const [dailyranklist, setDailyranklist] = useState<LeaderboardTemplate[]>([]);
  const [monthlyranklist, setMonthlyranklist] = useState<LeaderboardTemplate[]>([]);

  const openMenu = (event: any) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  useEffect(() => {
    if (!dailyRankData) {
      setDailyranklist((dailyRankData as unknown) as LeaderboardTemplate[]);
    }
    if (!monthlyRankData) {
      setMonthlyranklist((monthlyRankData as unknown) as LeaderboardTemplate[]);
    }
  });

  return (
    <MDBox my={3}>
      <Card>
        <DataTable
          tableColumns={dataTableLeaderboard.columns}
          tableRows={dailyranklist}
          entriesPerPage={false}
          setLoading={undefined}
          loading={false}
        />
        <DataTable
          tableColumns={dataTableLeaderboard.columns}
          tableRows={monthlyranklist}
          entriesPerPage={false}
          setLoading={undefined}
          loading={false}
        />
        {/* <RankShowPanel title="Daily Ranking" rankData={dailyRankData} />
        <RankShowPanel title="Monthly Ranking" rankData={monthlyRankData} /> */}
      </Card>
    </MDBox>
  );
};

export default LeaderboardTable;
