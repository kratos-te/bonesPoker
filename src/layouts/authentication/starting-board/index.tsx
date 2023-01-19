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

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import StartingDashboard from "./StartingDashboard";

const imgStyle = {
  backgroundImage: `url({https://i.ibb.co/GWpWjZ1/Whats-App-Image-2022-10-30-at-16-23-41.jpg})`,
};

function Start(): JSX.Element {
  return (
    <DashboardLayout>
      <StartingDashboard></StartingDashboard>
    </DashboardLayout>
  );
}

export default Start;
