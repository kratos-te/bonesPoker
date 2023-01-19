import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

function DataBar(): JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={4}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="dark"
            icon="weekend"
            title="Signed up wallets"
            count={281}
            percentage={{
              color: "success",
              amount: "+55%",
              label: "than yesterday",
            }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            icon="leaderboard"
            title="Daily Volume"
            count="2,300 SOL"
            percentage={{
              color: "success",
              amount: "+3%",
              label: "than last month",
            }}
          />
        </MDBox>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color="success"
            icon="store"
            title="Monthly Volume"
            count="34,000 SOL"
            percentage={{
              color: "dark",
              amount: "+0%",
              label: "than last month",
            }}
          />
        </MDBox>
      </Grid>
    </Grid>
  );
}

export default DataBar;
