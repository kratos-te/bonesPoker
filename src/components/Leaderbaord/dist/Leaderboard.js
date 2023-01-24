"use strict";
exports.__esModule = true;
var GameProvider_1 = require("../../context/GameProvider");
var RankShowPanel_1 = require("./RankShowPanel");
// import styles from "./Leaderboard.module.css";
var styles = require("./Leaderboard.module.css");
var Leaderboard = function () {
    var _a = GameProvider_1.useGame(), dailyRankData = _a.dailyRankData, monthlyRankData = _a.monthlyRankData;
    return (React.createElement("div", { className: styles.container },
        React.createElement(RankShowPanel_1["default"], { title: "Daily Ranking", rankData: dailyRankData }),
        React.createElement(RankShowPanel_1["default"], { title: "Monthly Ranking", rankData: monthlyRankData })));
};
exports["default"] = Leaderboard;
