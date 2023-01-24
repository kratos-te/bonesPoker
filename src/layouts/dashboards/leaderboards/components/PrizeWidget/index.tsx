import { useState } from "react";
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function PrizeWidget(): JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={6}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="dark"
            icon="redeem"
            title="Daily Ranking"
            count={"3 $SOL"}
            percentage={{
              color: "success",
              amount: "1x ",
              label: "Bone Voyage NFT",
            }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            icon="redeem"
            title="Monthly Ranking"
            count="140 $SOL"
            percentage={{
              color: "success",
              amount: "1x ",
              label: "Jelly rascal NFT",
            }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default PrizeWidget;
