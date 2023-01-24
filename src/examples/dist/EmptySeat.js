"use strict";
exports.__esModule = true;
var GameProvider_1 = require("../context/GameProvider");
var SocketProvider_1 = require("../context/SocketProvider");
var styles = require("../styles/Seat.module.css");
var EmptySeat = function (_a) {
    var tableId = _a.tableId, seatId = _a.seatId;
    var socket = SocketProvider_1.useSocket().socket;
    var setMyPlayerId = GameProvider_1.useGame().setMyPlayerId;
    return (React.createElement("div", { 
        // onClick={handleSit}
        className: styles.seat },
        React.createElement("div", null,
            "SEAT ",
            seatId)));
};
exports["default"] = EmptySeat;
