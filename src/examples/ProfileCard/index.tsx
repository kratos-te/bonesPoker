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

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS examples components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import MDAvatar from "components/MDAvatar";
// Overview page components

// Data
import userData from "layouts/authentication/userData";

// Images
import { Card } from "@mui/material";

function ProfileCard(): JSX.Element {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
        <Card id="basic-info" sx={{ overflow: "visible" }}>
          <ProfileInfoCard
            title={userData.user1.name}
            description={userData.user1.description}
            wallet={userData.user1.wallet}
            discord={userData.user1.discord}
            level={userData.user1.level}
            social={[
              {
                link: "https://twitter.com/creativetim",
                icon: <TwitterIcon />,
                color: "twitter",
              },
            ]}
            shadow={false}
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProfileCard;
