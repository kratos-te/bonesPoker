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

import { FC, forwardRef } from "react";

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// declaring props types for MDBadgeDot
interface Props {
  variant?: "gradient" | "contained";
  color?: "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg";
  badgeContent: string;
  font?:
    | {
        color: string;
        weight: string;
      }
    | any;
  [key: string]: any;
}

const MDBadgeDot: FC<Props> = forwardRef(
  ({ variant, color, size, badgeContent, font = {}, ...rest }, ref) => {
    let finalSize;
    let fontSize: any;
    let padding;

    if (size === "sm") {
      finalSize = "0.5rem";
      fontSize = "caption";
      padding = "0.45em 0.775em";
    } else if (size === "lg") {
      finalSize = "0.625rem";
      fontSize = "body2";
      padding = "0.85em 1.375em";
    } else if (size === "md") {
      finalSize = "0.5rem";
      fontSize = "button";
      padding = "0.65em 1em";
    } else {
      finalSize = "0.375rem";
      fontSize = "caption";
      padding = "0.45em 0.775em";
    }

    const validColors = [
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ];

    const validColorIndex = validColors.findIndex((el) => el === color);

    return (
      <MDBox ref={ref} display="flex" alignItems="center" p={padding} {...rest}>
        <MDBox
          component="i"
          display="inline-block"
          width={finalSize}
          height={finalSize}
          borderRadius="50%"
          bgColor={validColors[validColorIndex]}
          variant={variant}
          mr={1}
        />
        <MDTypography
          variant={fontSize}
          fontWeight={font.weight ? font.weight : "regular"}
          color={font.color ? font.color : "dark"}
          sx={{ lineHeight: 0 }}
        >
          {badgeContent}
        </MDTypography>
      </MDBox>
    );
  }
);

// Declaring default props for MDBadgeDot
MDBadgeDot.defaultProps = {
  variant: "contained",
  color: "info",
  size: "xs",
  font: {},
};

export default MDBadgeDot;
