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
import BasicSettings from "./components/BasicInfo";

// Material Dashboard 2 PRO React TS components

// Settings page components
import BasicInfo from "./components/BasicInfo";

function Settings(): JSX.Element {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <BasicSettings />
      </Grid>
    </Grid>
  );
}

export default Settings;
