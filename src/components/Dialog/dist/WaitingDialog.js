"use strict";
exports.__esModule = true;
var Dialog_1 = require("@mui/material/Dialog");
var DialogContent_1 = require("@mui/material/DialogContent");
var useMediaQuery_1 = require("@mui/material/useMediaQuery");
var styles_1 = require("@mui/material/styles");
var image_1 = require("next/image");
var styles = require("./WaitingDialog.module.css");
var WaitingDialog = function (_a) {
    var open = _a.open;
    var theme = styles_1.useTheme();
    var fullScreenMd = useMediaQuery_1["default"](theme.breakpoints.down("xs"));
    return (React.createElement(Dialog_1["default"], { fullScreen: fullScreenMd, open: open, keepMounted: true, "aria-labelledby": "waiting-dialog", sx: {
            "& .MuiPaper-root": {
                background: "#FFD793",
                color: "black",
                border: "3px solid #93FF9E",
                borderRadius: "10px",
                padding: "10px 10px",
                margin: "10px"
            }
        } },
        React.createElement(DialogContent_1["default"], null,
            React.createElement("div", { className: styles.title },
                "Joining Table",
                React.createElement("div", { className: "lds-ellipsis" },
                    React.createElement("div", null),
                    React.createElement("div", null),
                    React.createElement("div", null),
                    React.createElement("div", null))),
            React.createElement("div", { className: styles.text }, "This takes some seconds. you will be seated on your table soon."),
            React.createElement("div", { className: styles.logoWrapper },
                React.createElement(image_1["default"], { src: "/img/bones-coin.png", alt: "Logo", layout: "fill", className: styles.logoImg })))));
};
exports["default"] = WaitingDialog;
