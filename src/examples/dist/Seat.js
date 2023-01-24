"use strict";
exports.__esModule = true;
var react_1 = require("react");
var GameProvider_1 = require("../context/GameProvider");
var EmptySeat_1 = require("./EmptySeat");
var OccupiedSeat_1 = require("./OccupiedSeat");
var HoleCards_1 = require("./HoleCards");
var Card_1 = require("../types/Card");
var Action_1 = require("../types/Action");
var styles = require("../styles/Seat.module.css");
var RIGHT_SEAT_IDS = ["1", "7", "8", "9", "10"];
var SeatPosition = {
    1: { top: "85%", left: "60%" },
    2: { top: "85%", left: "45%" },
    3: { top: "85%", left: "30%" },
    4: { top: "66%", left: "12%" },
    5: { top: "27%", left: "12%" },
    6: { top: "12%", left: "30%" },
    7: { top: "12%", left: "45%" },
    8: { top: "12%", left: "60%" },
    9: { top: "30%", left: "75%" },
    10: { top: "66%", left: "75%" }
};
var Seat = function (_a) {
    var tableId = _a.tableId, seatId = _a.seatId, player = _a.player, showPreviousWinners = _a.showPreviousWinners, previousWinners = _a.previousWinners;
    var _b = GameProvider_1.useGame(), currentPlayerId = _b.currentPlayerId, winners = _b.winners, holeCards = _b.holeCards, myPlayerId = _b.myPlayerId, gameStarted = _b.gameStarted, bestHand = _b.bestHand, winFlag = _b.winFlag, isCountDown = _b.isCountDown, countDown = _b.countDown, gameStartCountDown = _b.gameStartCountDown, allCanOnlyCheck = _b.allCanOnlyCheck, numPlayers = _b.numPlayers;
    var previousWinnersMap = react_1.useMemo(function () {
        return showPreviousWinners && previousWinners
            ? previousWinners.reduce(function (acc, w) {
                acc[w.playerId] = w;
                return acc;
            }, {})
            : {};
    }, [previousWinners]);
    var winnersMap = !winners
        ? {}
        : winners.reduce(function (acc, w) {
            acc[w.playerId] = w;
            return acc;
        }, {});
    return (React.createElement("div", { className: styles.container }, !player ? (React.createElement(EmptySeat_1["default"], { tableId: tableId, seatId: seatId })) : !gameStarted ? (React.createElement(OccupiedSeat_1["default"], { playerId: player.id, address: player.address, name: player.name, pfp: player.pfp, seatId: seatId })) : !showPreviousWinners ? (React.createElement(React.Fragment, null, React.createElement("div", { className: styles.seatWithCards },
        player.id in winnersMap ? (React.createElement("div", { className: styles.winnerBanner },
            React.createElement("div", null,
                "Winner",
                winnersMap[player.id].desc && React.createElement(React.Fragment, null,
                    "(",
                    winnersMap[player.id].desc,
                    ")")))) : (React.createElement(React.Fragment, null, (player.lastAction ||
            (player.id === currentPlayerId &&
                (!player.lastAction || player.lastAction != Action_1.Action.FOLD))) && (React.createElement("div", { className: styles.lastActionWrapper },
            player.lastAction && (React.createElement(React.Fragment, null, 
            // && !winners
            React.createElement("div", { className: styles.lastActionItem },
                React.createElement("div", null,
                    player.lastAction,
                    (player.lastAction == Action_1.Action.CALL ||
                        player.lastAction == Action_1.Action.RAISE ||
                        player.lastAction == Action_1.Action.ALL_IN) && React.createElement(React.Fragment, null,
                        "( ",
                        player.bet,
                        " )"))))),
            player.id === currentPlayerId &&
                (!player.lastAction || player.lastAction != Action_1.Action.FOLD) && (React.createElement("div", { className: styles.lastActionItem },
                isCountDown && gameStarted && countDown
            // AUTO_START_TIME - minusAmount
            ,
                isCountDown && !gameStarted && gameStartCountDown
            // AUTO_FOLD_TIME - gameStartMinusAmount
            ))))))
    //bestHand <div className={styles.bestHand}>
    //   {/* {bestHand} */}
    // </div>
    ,
        player.id === currentPlayerId ? (React.createElement(React.Fragment, null, (!player.lastAction || player.lastAction != Action_1.Action.FOLD) && (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.currentPlayerCardsContainer },
                React.createElement(HoleCards_1["default"], { cards: player.id === myPlayerId
                        ? holeCards
                            ? holeCards
                            : Card_1.HIDDEN_CARDS
                        : Card_1.HIDDEN_CARDS })))))) : (React.createElement(React.Fragment, null, (!player.lastAction || player.lastAction != Action_1.Action.FOLD) && (React.createElement("div", { className: (player.folded ? styles.folded : "") + " " + styles.cardPosition },
            React.createElement(HoleCards_1["default"], { cards: player.id === myPlayerId
                    ? holeCards
                    : winFlag
                        ? !player.folded
                            ? player.cards
                            : Card_1.HIDDEN_CARDS
                        : Card_1.HIDDEN_CARDS }))))),
        React.createElement("div", { className: styles.playingSeat + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat) },
            React.createElement("div", null, player.name && player.name != "" ? (player.name.length > 10 ? (player.name.slice(0, 8) + "...") : (player.name)) : (React.createElement(React.Fragment, null, player.address.slice(0, 4) + "..." + player.address.slice(-4)))),
            React.createElement("div", { className: Object.entries(winnersMap).length > 0 ? styles.winnerStack : "" }, !allCanOnlyCheck && player.stack),
            React.createElement("img", { src: player.pfp, className: styles.pfp + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp) }),
            (player.dealer || player.smallBlind || player.bigBlind) && (React.createElement("div", { className: styles.dealMarkWrapper + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightDealMarkWrapper) },
                player.dealer && (React.createElement("span", { className: styles.dealMark + " " + styles.bgColorPink }, "D")),
                numPlayers > 2 && player.smallBlind && (React.createElement("span", { className: styles.dealMark + " " + styles.bgColorYellow }, "SB")),
                numPlayers > 2 && player.bigBlind && (React.createElement("span", { className: styles.dealMark + " " + styles.bgColorGreen }, "BB"))))),
        React.createElement("div", { className: styles.playerData })))) : (React.createElement("div", { className: styles.seatWithCards }, player.id in previousWinnersMap ? (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.winnerBanner },
            React.createElement("div", null,
                "Winner (",
                previousWinnersMap[player.id].desc,
                ")")),
        React.createElement("div", { className: "" + styles.cardPosition },
            React.createElement(HoleCards_1["default"], { cards: previousWinnersMap[player.id].cards })),
        React.createElement("div", { className: styles.playingSeat + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat) },
            player.name && player.name != "" ? (player.name.length > 10 ? (player.name.slice(0, 8) + "...") : (player.name)) : (React.createElement(React.Fragment, null, player.address.slice(0, 4) + "..." + player.address.slice(-4))),
            React.createElement("img", { src: player.pfp, className: styles.pfp + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp) })))) : (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "" + styles.cardPosition },
            React.createElement(HoleCards_1["default"], { cards: Card_1.HIDDEN_CARDS })),
        React.createElement("div", { className: styles.playingSeat + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat) },
            player.name && player.name != "" ? (player.name.length > 10 ? (player.name.slice(0, 8) + "...") : (player.name)) : (React.createElement(React.Fragment, null, player.address.slice(0, 4) + "..." + player.address.slice(-4))),
            React.createElement("img", { src: player.pfp, className: styles.pfp + " " + (RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp) }))))))));
};
exports["default"] = Seat;
