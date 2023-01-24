"use strict";
exports.__esModule = true;
var web3_js_1 = require("@solana/web3.js");
var link_1 = require("next/link");
var utils_1 = require("../../utils/utils");
// import styles from "./RankShowPanel.module.css";
var styles = require("./RankShowPanel.module.css");
var RankShowPanel = function (_a) {
    var rankData = _a.rankData, title = _a.title;
    return (React.createElement("div", { className: styles.container },
        React.createElement("p", { className: styles.title }, title),
        React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", { className: styles.row },
                    React.createElement("th", null, "Rank"),
                    React.createElement("th", null, "Player name"),
                    React.createElement("th", null, "$SOL won"),
                    React.createElement("th", null, "games won"),
                    React.createElement("th", null, "win rate"))),
            React.createElement("tbody", null, rankData.map(function (row, index) {
                return (React.createElement("tr", { key: title + index, className: styles.row },
                    React.createElement("td", null,
                        index + 1,
                        index + 1 == 1 ? "st" : index + 1 == 2 ? "nd" : index + 1 == 3 ? "rd" : "th"),
                    React.createElement("td", null,
                        React.createElement(link_1["default"], { href: "/detail/" + row.address },
                            React.createElement("a", { className: styles.link }, row.name ? row.name : utils_1.getShortWalletString(row.address, 4)))),
                    React.createElement("td", null,
                        Math.floor((row.reward / web3_js_1.LAMPORTS_PER_SOL) * 100) / 100,
                        " SOL"),
                    React.createElement("td", null, row.gamesWon),
                    React.createElement("td", null,
                        row.gamesWon > 0 ? Math.floor((row.gamesWon / row.totalGames) * 100) : 0,
                        " %")));
            })))));
};
exports["default"] = RankShowPanel;
