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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Declaring props types for StatusCell
interface Props {
  icon: string;
  color:
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "dark"
    | "light"
    | "white"
    | "default";
  status: string;
}

function StatusCell({ icon, color, status }: Props): JSX.Element {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDButton color={"success"} size="small">
          {status}
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export default StatusCell;
