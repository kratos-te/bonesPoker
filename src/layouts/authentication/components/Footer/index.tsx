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
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";
import { Theme } from "@mui/material/styles";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import TwitterIcon from "@mui/icons-material/Twitter";

// Material Dashboard 2 PRO React TS Base Styles
import typography from "assets/theme/base/typography";
import Twitter from "@mui/icons-material/Twitter";

function Footer({ light }: { light?: boolean }): JSX.Element {
  const { size } = typography;

  return (
    <MDBox position="absolute" width="100%" bottom={0} py={4}>
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            &copy; {new Date().getFullYear()}, created by
            <MDBox fontSize={size.md} color={light ? "white" : "dark"} mb={-0.5} mx={0.25}></MDBox>
            <Link href="https://twitter.com/bonesdao" target="_blank">
              <MDTypography variant="button" fontWeight="medium" color={light ? "white" : "dark"}>
                &nbsp;Bones&nbsp;
              </MDTypography>
            </Link>
          </MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }: Theme) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <MDBox component="li" pl={2} lineHeight={1}>
              <Link href="https://twitter.com/bonesdao" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Twitter
                </MDTypography>
              </Link>
            </MDBox>
            <MDBox component="li" pl={2} lineHeight={1}>
              <Link href="http://discord.gg/bonesdao" target="_blank">
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Discord
                </MDTypography>
              </Link>
            </MDBox>
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  );
}

// Declaring default props for Footer
Footer.defaultProps = {
  light: false,
};

export default Footer;
