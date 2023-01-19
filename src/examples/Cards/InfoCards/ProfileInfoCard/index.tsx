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

// react-routers components
import { Link } from "react-router-dom";
import ReviewCell from "layouts/dashboards/leaderboards/components/ReviewCell";
// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React TS Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import MDAvatar from "components/MDAvatar";
import userData from "layouts/authentication/userData";

// Declaring props types for ProfileInfoCard
interface Props {
  title: string;
  description: string;
  social: {
    [key: string]: any;
  }[];

  shadow?: boolean;
  [key: string]: any;
}

function ProfileInfoCard({
  title,
  description,
  discord,
  wallet,
  social,
  shadow,
  level,
}: Props): JSX.Element {
  const labels: string[] = [];
  const values: string[] = [];
  const { socialMediaColors } = colors;
  const { size } = typography;

  // Convert this form `objectKey` of the object key in to this `object key`

  // Push the object values into the values array

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  // Render the card social media icons
  const renderSocial = social.map(({ link, icon, color }) => (
    <MDBox
      key={color}
      component="a"
      href={link}
      target="_blank"
      rel="noreferrer"
      fontSize={size.lg}
      color={socialMediaColors[color].main}
      pr={1}
      pl={0.5}
      lineHeight={1}
    >
      {icon}
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }} style={{ padding: "20px" }}>
      <MDBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
        <MDAvatar
          src={userData.user1.pfp}
          alt="profile-image"
          size="xl"
          shadow="sm"
          p={2}
        ></MDAvatar>
      </MDBox>
      <MDBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
        <ReviewCell rating={level} />
      </MDBox>
      <Divider />

      <MDBox p={2} justifyContent="center" alignItems="center">
        <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox>
        <Divider />
        <MDBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
          <MDTypography variant="button" color="text" fontWeight="bold">
            Wallet:{" "}
            <MDTypography variant="button" color="text" fontWeight="regular">
              {wallet}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
          <MDTypography variant="button" color="text" fontWeight="bold">
            Discord:{" "}
            <MDTypography variant="button" color="text" fontWeight="regular">
              {discord}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox display="flex" justifyContent="center" alignItems="center" pt={2} px={2}>
          {renderSocial}
        </MDBox>{" "}
      </MDBox>
    </Card>
  );
}

// Declaring default props for ProfileInfoCard
ProfileInfoCard.defaultProps = {
  shadow: true,
};

export default ProfileInfoCard;
