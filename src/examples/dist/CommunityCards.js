"use strict";
exports.__esModule = true;
var CommunityCard_1 = require("./CommunityCard");
var styles = require("../styles/CommunityCards.module.css");
var CummunityCards = function (_a) {
    var cards = _a.cards;
    return (React.createElement("div", { className: styles.cardsContainer },
        React.createElement(CommunityCard_1["default"], { card: cards[0] }),
        React.createElement(CommunityCard_1["default"], { card: cards[1] }),
        React.createElement(CommunityCard_1["default"], { card: cards[2] }),
        React.createElement(CommunityCard_1["default"], { card: cards[3] }),
        React.createElement(CommunityCard_1["default"], { card: cards[4] })));
};
exports["default"] = CummunityCards;
