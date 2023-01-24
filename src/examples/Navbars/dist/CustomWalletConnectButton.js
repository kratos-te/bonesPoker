"use strict";
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
exports.CustomWalletConnectButton = void 0;
var react_1 = require("react");
var ConnectButton_1 = require("./ConnectButton");
var svgIcons_1 = require("../svgIcons");
var wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
exports.CustomWalletConnectButton = function (_a) {
    var children = _a.children, disabled = _a.disabled, onClick = _a.onClick, props = __rest(_a, ["children", "disabled", "onClick"]);
    var _b = wallet_adapter_react_1.useWallet(), wallet = _b.wallet, connect = _b.connect, connecting = _b.connecting, connected = _b.connected;
    var handleClick = react_1.useCallback(function (event) {
        if (onClick)
            onClick(event);
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (!event.defaultPrevented)
            connect()["catch"](function () { });
    }, [onClick, connect]);
    var content = react_1.useMemo(function () {
        if (children)
            return children;
        if (connecting)
            return "Connecting ...";
        if (connected)
            return "Connected";
        if (wallet)
            return "Connect";
        return "Connect Wallet";
    }, [children, connecting, connected, wallet]);
    return (react_1["default"].createElement(ConnectButton_1.ConnectButton, __assign({ className: "wallet-adapter-button-trigger", disabled: disabled || !wallet || connecting || connected, startIcon: wallet ? react_1["default"].createElement(svgIcons_1.userProfile, null) : undefined, onClick: handleClick }, props), content));
};
