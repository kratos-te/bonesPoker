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

import { useState, useEffect, ReactNode } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box } from "@mui/material";
import React from "react";
import userData from "layouts/authentication/userData";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 PRO React TS Base Styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import ActiveGamesTable from "layouts/dashboards/activegames/components/ActiveGamesTable";
import TableTable from "layouts/dashboards/tables/components/TableTable";
import TournamentTable from "layouts/dashboards/tournaments/components/TournamentTable";
import { BsSuitSpadeFill, BsSuitClubFill, BsSuitDiamondFill } from "react-icons/bs";
import HeroSection from "layouts/authentication/components/HeroSection/HeroSection";
import { useGame } from "context/GameProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <MDTypography component={"span"} variant={"body2"}>
            {children}
          </MDTypography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// change Header here
function StartingDashboard({ children }: { children?: ReactNode }): JSX.Element {
  const [tabsOrientation, setTabsOrientation] = useState<"horizontal" | "vertical">("horizontal");

  const { userName, userPfp } = useGame();
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="10.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.1),
              rgba(gradients.info.state, 0.1)
            )}, url(${"https://i.ibb.co/GWpWjZ1/Whats-App-Image-2022-10-30-at-16-23-41.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 0,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={userPfp} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Welcome back {userName}!
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Have fun playing
              </MDTypography>
            </MDBox>
          </Grid>
          {/* <HeroSection /> */}
          <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={value} onChange={handleChange}>
                <Tab
                  label=""
                  icon={<BsSuitDiamondFill color="red"></BsSuitDiamondFill>}
                  {...a11yProps(0)}
                />
                <Tab label="" icon={<BsSuitSpadeFill></BsSuitSpadeFill>} {...a11yProps(1)} />
                <Tab label="" icon={<BsSuitClubFill></BsSuitClubFill>} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        {children}
        <TabPanel value={value} index={0}>
          <ActiveGamesTable></ActiveGamesTable>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TableTable></TableTable>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TournamentTable></TournamentTable>
        </TabPanel>
      </Card>
    </MDBox>
  );
}

// Declaring default props for Header
StartingDashboard.defaultProps = {
  children: "",
};

export default StartingDashboard;
