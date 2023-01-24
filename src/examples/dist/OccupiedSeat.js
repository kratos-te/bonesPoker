"use strict";
exports.__esModule = true;
var styles = require("../styles/Seat.module.css");
var RIGHT_SEAT_IDS = ["1", "7", "8", "9", "10"];
var OccupiedSeat = function (_a) {
    var playerId = _a.playerId, address = _a.address, name = _a.name, pfp = _a.pfp, seatId = _a.seatId;
    return (
    // <div
    //   className={styles.seat}
    //   style={{
    //     ...position,
    //   }}
    // >
    //   <div>
    //     {
    //       name && name != "" ?
    //         (name.length > 10 ? name.slice(0, 6) + "..." : name) :
    //         <>
    //           {
    //             address.slice(0, 6)
    //           }...
    //           <br />
    //           {
    //             address.slice(-6)
    //           }
    //         </>
    //     }
    //   </div>
    // </div>
    React.createElement("div", { className: styles.playingSeat + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat) },
        name && name != "" ? (name.length > 10 ? (name.slice(0, 8) + "...") : (name)) : (React.createElement(React.Fragment, null, address.slice(0, 4) + "..." + address.slice(-4))),
        React.createElement("img", { src: pfp, className: styles.pfp + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp) })));
};
exports["default"] = OccupiedSeat;
