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
import InfoIcon from "@mui/icons-material/Info";

// Declaring props types for ProductCell
interface Props {
  name: string;
}

function ProductCell({ name }: Props): JSX.Element {
  return (
    <MDBox display="flex" pr={2}>
      <MDBox mr={1}>
        <InfoIcon />
      </MDBox>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="button" fontWeight="regular">
          {name}
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}

export default ProductCell;
