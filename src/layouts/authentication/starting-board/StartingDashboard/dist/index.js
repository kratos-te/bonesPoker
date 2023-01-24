"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
// @mui material components
var Card_1 = require("@mui/material/Card");
var Grid_1 = require("@mui/material/Grid");
var AppBar_1 = require("@mui/material/AppBar");
var Tabs_1 = require("@mui/material/Tabs");
var Tab_1 = require("@mui/material/Tab");
var material_1 = require("@mui/material");
var react_2 = require("react");
// Material Dashboard 2 PRO React TS components
var MDBox_1 = require("components/MDBox");
var MDTypography_1 = require("components/MDTypography");
var MDAvatar_1 = require("components/MDAvatar");
// Material Dashboard 2 PRO React TS Base Styles
var breakpoints_1 = require("assets/theme/base/breakpoints");
// Images
var ActiveGamesTable_1 = require("layouts/dashboards/activegames/components/ActiveGamesTable");
var TableTable_1 = require("layouts/dashboards/tables/components/TableTable");
var TournamentTable_1 = require("layouts/dashboards/tournaments/components/TournamentTable");
var bs_1 = require("react-icons/bs");
var GameProvider_1 = require("context/GameProvider");
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return (react_2["default"].createElement("div", __assign({ role: "tabpanel", hidden: value !== index, id: "simple-tabpanel-" + index, "aria-labelledby": "simple-tab-" + index }, other), value === index && (react_2["default"].createElement(material_1.Box, { sx: { p: 3 } },
        react_2["default"].createElement(MDTypography_1["default"], { component: "span", variant: "body2" }, children)))));
}
function a11yProps(index) {
    return {
        id: "simple-tab-" + index,
        "aria-controls": "simple-tabpanel-" + index
    };
}
// change Header here
function StartingDashboard(_a) {
    var children = _a.children;
    var _b = react_1.useState("horizontal"), tabsOrientation = _b[0], setTabsOrientation = _b[1];
    var _c = GameProvider_1.useGame(), userName = _c.userName, userPfp = _c.userPfp;
    react_1.useEffect(function () {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints_1["default"].values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }
        /**
         The event listener that's calling the handleTabsOrientation function when resizing the window.
        */
        window.addEventListener("resize", handleTabsOrientation);
        // Call the handleTabsOrientation function to set the state with the initial value.
        handleTabsOrientation();
        // Remove event listener on cleanup
        return function () { return window.removeEventListener("resize", handleTabsOrientation); };
    }, [tabsOrientation]);
    var _d = react_2["default"].useState(0), value = _d[0], setValue = _d[1];
    var handleChange = function (event, newValue) {
        setValue(newValue);
    };
    return (react_2["default"].createElement(MDBox_1["default"], { position: "relative", mb: 5 },
        react_2["default"].createElement(MDBox_1["default"], { display: "flex", alignItems: "center", position: "relative", minHeight: "10.75rem", borderRadius: "xl", sx: {
                backgroundImage: function (_a) {
                    var _b = _a.functions, rgba = _b.rgba, linearGradient = _b.linearGradient, gradients = _a.palette.gradients;
                    return linearGradient(rgba(gradients.info.main, 0.1), rgba(gradients.info.state, 0.1)) + ", url(" + "https://i.ibb.co/GWpWjZ1/Whats-App-Image-2022-10-30-at-16-23-41.jpg" + ")";
                },
                backgroundSize: "cover",
                backgroundPosition: "50%",
                overflow: "hidden"
            } }),
        react_2["default"].createElement(Card_1["default"], { sx: {
                position: "relative",
                mt: -8,
                mx: 0,
                py: 2,
                px: 2
            } },
            react_2["default"].createElement(Grid_1["default"], { container: true, spacing: 3, alignItems: "center" },
                react_2["default"].createElement(Grid_1["default"], { item: true },
                    react_2["default"].createElement(MDAvatar_1["default"], { src: userPfp, alt: "profile-image", size: "xl", shadow: "sm" })),
                react_2["default"].createElement(Grid_1["default"], { item: true },
                    react_2["default"].createElement(MDBox_1["default"], { height: "100%", mt: 0.5, lineHeight: 1 },
                        react_2["default"].createElement(MDTypography_1["default"], { variant: "h5", fontWeight: "medium" },
                            "Welcome back ",
                            userName,
                            "!"),
                        react_2["default"].createElement(MDTypography_1["default"], { variant: "button", color: "text", fontWeight: "regular" }, "Have fun playing"))),
                react_2["default"].createElement(Grid_1["default"], { item: true, xs: 12, md: 6, lg: 4, sx: { ml: "auto" } },
                    react_2["default"].createElement(AppBar_1["default"], { position: "static" },
                        react_2["default"].createElement(Tabs_1["default"], { orientation: tabsOrientation, value: value, onChange: handleChange },
                            react_2["default"].createElement(Tab_1["default"], __assign({ label: "", icon: react_2["default"].createElement(bs_1.BsSuitDiamondFill, { color: "red" }) }, a11yProps(0))),
                            react_2["default"].createElement(Tab_1["default"], __assign({ label: "", icon: react_2["default"].createElement(bs_1.BsSuitSpadeFill, null) }, a11yProps(1))),
                            react_2["default"].createElement(Tab_1["default"], __assign({ label: "", icon: react_2["default"].createElement(bs_1.BsSuitClubFill, null) }, a11yProps(2))))))),
            children,
            react_2["default"].createElement(TabPanel, { value: value, index: 0 },
                react_2["default"].createElement(ActiveGamesTable_1["default"], null)),
            react_2["default"].createElement(TabPanel, { value: value, index: 1 },
                react_2["default"].createElement(TableTable_1["default"], null)),
            react_2["default"].createElement(TabPanel, { value: value, index: 2 },
                react_2["default"].createElement(TournamentTable_1["default"], null)))));
}
// Declaring default props for Header
StartingDashboard.defaultProps = {
    children: ""
};
exports["default"] = StartingDashboard;
