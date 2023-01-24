import type { CSSProperties, FC, MouseEvent, PropsWithChildren, ReactElement } from "react";
import Button from "@mui/material/Button";
import React from "react";
// import styles from "./Button.module.css";
const styles = require("./Button.module.css");
export type ButtonProps = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
  endIcon?: ReactElement;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
  style?: CSSProperties;
  tabIndex?: number;
}>;

export const ConnectButton: FC<ButtonProps> = (props) => {
  return (
    <Button
      // className={`wallet-adapter-button ${props.className || ""}`}
      variant="contained"
      disabled={props.disabled}
      style={props.style}
      onClick={props.onClick}
      tabIndex={props.tabIndex || 0}
      startIcon={props.startIcon && <span className={styles.icon}>{props.startIcon}</span>}
      color="success"
    >
      {props.children}
      {props.endIcon && <i className="wallet-adapter-button-end-icon">{props.endIcon}</i>}
    </Button>
  );
};
