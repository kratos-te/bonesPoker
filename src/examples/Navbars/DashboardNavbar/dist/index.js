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
exports.__esModule = true;
var react_1 = require("react");
// react-router components
var react_router_dom_1 = require("react-router-dom");
// @material-ui core components
var AppBar_1 = require("@mui/material/AppBar");
var Toolbar_1 = require("@mui/material/Toolbar");
var IconButton_1 = require("@mui/material/IconButton");
var Menu_1 = require("@mui/material/Menu");
var Icon_1 = require("@mui/material/Icon");
// Material Dashboard 2 PRO React TS components
var MDBox_1 = require("components/MDBox");
// Material Dashboard 2 PRO React TS examples components
var NotificationItem_1 = require("examples/Items/NotificationItem");
// Custom styles for DashboardNavbar
var styles_1 = require("examples/Navbars/DashboardNavbar/styles");
// Material Dashboard 2 PRO React context
var context_1 = require("context");
var Menu_2 = require("@mui/icons-material/Menu");
var CustomWalletMultiButton_1 = require("../CustomWalletMultiButton");
function DashboardNavbar(_a) {
    var absolute = _a.absolute, light = _a.light, isMini = _a.isMini;
    var _b = react_1.useState(), navbarType = _b[0], setNavbarType = _b[1];
    var _c = context_1.useMaterialUIController(), controller = _c[0], dispatch = _c[1];
    var miniSidenav = controller.miniSidenav, transparentNavbar = controller.transparentNavbar, fixedNavbar = controller.fixedNavbar, openConfigurator = controller.openConfigurator, darkMode = controller.darkMode;
    var _d = react_1.useState(false), openMenu = _d[0], setOpenMenu = _d[1];
    var route = react_router_dom_1.useLocation().pathname.split("/").slice(1);
    react_1.useEffect(function () {
        // Setting the navbar type
        if (fixedNavbar) {
            setNavbarType("sticky");
        }
        else {
            setNavbarType("static");
        }
        // A function that sets the transparent state of the navbar.
        function handleTransparentNavbar() {
            context_1.setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
        }
        /**
         The event listener that's calling the handleTransparentNavbar function when
         scrolling the window.
        */
        window.addEventListener("scroll", handleTransparentNavbar);
        // Call the handleTransparentNavbar function to set the state with the initial value.
        handleTransparentNavbar();
        // Remove event listener on cleanup
        return function () { return window.removeEventListener("scroll", handleTransparentNavbar); };
    }, [dispatch, fixedNavbar]);
    var handleMiniSidenav = function () { return context_1.setMiniSidenav(dispatch, !miniSidenav); };
    var handleConfiguratorOpen = function () { return context_1.setOpenConfigurator(dispatch, !openConfigurator); };
    var handleOpenMenu = function (event) { return setOpenMenu(event.currentTarget); };
    var handleCloseMenu = function () { return setOpenMenu(false); };
    // Render the notifications menu
    var renderMenu = function () { return (React.createElement(Menu_1["default"], { anchorEl: openMenu, anchorReference: null, anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        }, open: Boolean(openMenu), onClose: handleCloseMenu, sx: { mt: 2 } },
        React.createElement(NotificationItem_1["default"], { icon: React.createElement(Icon_1["default"], null, "email"), title: "Check new messages" }),
        React.createElement(NotificationItem_1["default"], { icon: React.createElement(Icon_1["default"], null, "podcasts"), title: "Manage Podcast sessions" }),
        React.createElement(NotificationItem_1["default"], { icon: React.createElement(Icon_1["default"], null, "shopping_cart"), title: "Payment successfully completed" }))); };
    // Styles for the navbar icons
    var iconsStyle = function (_a) {
        var _b = _a.palette, dark = _b.dark, white = _b.white, text = _b.text, rgba = _a.functions.rgba;
        return ({
            color: function () {
                var colorValue = light || darkMode ? white.main : dark.main;
                if (transparentNavbar && !light) {
                    colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
                }
                return colorValue;
            }
        });
    };
    return (React.createElement(AppBar_1["default"], { position: absolute ? "absolute" : navbarType, color: "inherit", 
        //style={{
        //  background: "url(https://i.ibb.co/zQ0xwmW/Whats-App-Image-2022-10-30-at-16-23-41.png)",
        //}}
        sx: function (theme) { return styles_1.navbar(theme, { transparentNavbar: transparentNavbar, absolute: absolute, light: light, darkMode: darkMode }); } },
        React.createElement(Toolbar_1["default"], { sx: styles_1.navbarContainer },
            React.createElement(MDBox_1["default"], { color: "inherit", mb: { xs: 1, md: 0 }, sx: function (theme) { return styles_1.navbarRow(theme, { isMini: isMini }); } },
                React.createElement(IconButton_1["default"], { sx: styles_1.navbarDesktopMenu, onClick: handleMiniSidenav, size: "small", disableRipple: true },
                    React.createElement(Menu_2["default"], { fontSize: "medium", sx: iconsStyle }, miniSidenav ? "menu_open" : "menu"))),
            isMini ? null : (React.createElement(MDBox_1["default"], { sx: function (theme) { return styles_1.navbarRow(theme, { isMini: isMini }); } },
                React.createElement(MDBox_1["default"], { pr: 1 }),
                React.createElement(MDBox_1["default"], { color: light ? "white" : "inherit" },
                    React.createElement(CustomWalletMultiButton_1.CustomWalletMultiButton, null),
                    renderMenu()))))));
}
// Declaring default props for DashboardNavbar
DashboardNavbar.defaultProps = {
    absolute: false,
    light: false,
    isMini: false
};
exports["default"] = DashboardNavbar;
