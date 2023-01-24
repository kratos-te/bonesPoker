"use strict";
exports.__esModule = true;
var Cloudinary_1 = require("../utils/Cloudinary");
var image_1 = require("next/image");
var styles = require("../styles/CommunityCards.modul.css");
var CummunityCard = function (_a) {
    var card = _a.card;
    if (!card) {
        return React.createElement("div", { className: styles.cardPlaceholder });
    }
    return (React.createElement("div", { className: styles.cardContainer },
        React.createElement(image_1["default"], { src: Cloudinary_1.getCloudinaryPokerCard(card), alt: "community-card", layout: "fill" })));
};
exports["default"] = CummunityCard;
