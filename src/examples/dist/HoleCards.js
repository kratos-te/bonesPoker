"use strict";
exports.__esModule = true;
var Card_1 = require("../types/Card");
var Cloudinary_1 = require("../utils/Cloudinary");
var image_1 = require("next/image");
var styles = require("../styles/HoleCards.module.css");
var HoleCards = function (_a) {
    var cards = _a.cards;
    return (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "center"
        } },
        React.createElement("div", { className: styles.cardContainer }, cards[0] ? (React.createElement(image_1["default"], { src: Cloudinary_1.getCloudinaryPokerCard(cards[0]), alt: "hole-card", layout: "fill", className: styles.card })) : (React.createElement(image_1["default"], { src: Cloudinary_1.getCloudinaryPokerCard(Card_1.HIDDEN_CARDS[0]), alt: "hole-card", layout: "fill", className: styles.card }))),
        React.createElement("div", { className: styles.cardContainer }, cards[1] ? (React.createElement(image_1["default"], { src: Cloudinary_1.getCloudinaryPokerCard(cards[1]), alt: "hole-card", layout: "fill", className: styles.card })) : (React.createElement(image_1["default"], { src: Cloudinary_1.getCloudinaryPokerCard(Card_1.HIDDEN_CARDS[1]), alt: "hole-card", layout: "fill", className: styles.card })))));
};
exports["default"] = HoleCards;
