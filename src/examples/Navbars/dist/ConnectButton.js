"use strict";
exports.__esModule = true;
exports.ConnectButton = void 0;
var Button_1 = require("@mui/material/Button");
var react_1 = require("react");
// import styles from "./Button.module.css";
var styles = require("./Button.module.css");
exports.ConnectButton = function (props) {
    return (react_1["default"].createElement(Button_1["default"]
    // className={`wallet-adapter-button ${props.className || ""}`}
    , { 
        // className={`wallet-adapter-button ${props.className || ""}`}
        variant: "contained", disabled: props.disabled, style: props.style, onClick: props.onClick, tabIndex: props.tabIndex || 0, startIcon: props.startIcon && react_1["default"].createElement("span", { className: styles.icon }, props.startIcon), color: "success" },
        props.children,
        props.endIcon && react_1["default"].createElement("i", { className: "wallet-adapter-button-end-icon" }, props.endIcon)));
};
