"use strict";
exports.__esModule = true;
exports.useSocket = void 0;
/* eslint-disable prettier/prettier */
var react_1 = require("react");
var socket_io_client_1 = require("socket.io-client");
var SEVER_URL = process.env.REACT_APP_SERVERURL;
var context = react_1.createContext({});
exports.useSocket = function () { return react_1.useContext(context); };
var SocketProvider = function (props) {
    var _a = react_1.useState(), socket = _a[0], setSocket = _a[1];
    react_1.useEffect(function () {
        // TODO: consider reconnect on page refresh
        // TODO: check why we call the provider twice, we only need one socket
        // TODO: when connecting from firefox we get "unhandledeRejection error"
        var serverUrl = SEVER_URL || "http://localhost:4000";
        var socket = socket_io_client_1["default"](serverUrl, {
            transports: ["websocket"]
        });
        socket.on("connect", function () {
            console.log("connected to backend", socket.id);
        });
        socket.on("disconnect", function () {
            console.log("disconnected from backend", socket.id);
        });
        setSocket(socket);
        return function () {
            socket.off("connect");
            socket.off("disconnect");
            setSocket(undefined);
        };
    }, []);
    return React.createElement(context.Provider, { value: { socket: socket } }, props.children);
};
exports["default"] = SocketProvider;
