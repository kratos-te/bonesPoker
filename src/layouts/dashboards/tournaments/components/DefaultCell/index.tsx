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

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Declaring props types for DefaultCell
interface Props {
  value: string;
  suffix?: string | boolean;
}

function DefaultCell({ value, suffix }: Props): JSX.Element {
  return (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={1}>
        <MDTypography variant="caption" fontWeight="medium" color="text">
          {value}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

// Declaring default props for DefaultCell
DefaultCell.defaultProps = {
  suffix: "",
};

export default DefaultCell;
