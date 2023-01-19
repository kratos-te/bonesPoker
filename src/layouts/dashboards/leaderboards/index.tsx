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

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

// Sales dashboard components

// Data
import LeaderboardTable from "./components/LeaderboardTable";
import PrizeWidget from "./components/PrizeWidget";

function Leaderboards(): JSX.Element {
  return (
    <DashboardLayout>
      <PrizeWidget></PrizeWidget>
      <Grid container spacing={0}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <LeaderboardTable></LeaderboardTable>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default Leaderboards;
