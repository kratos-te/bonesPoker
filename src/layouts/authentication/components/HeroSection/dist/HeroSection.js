"use strict";
exports.__esModule = true;
exports.FEATURED_POST = void 0;
// import styles from "./HeroSection.module.css";
var Carousel_1 = require("react-bootstrap/Carousel");
var styles = require("./HeroSection.module.css");
exports.FEATURED_POST = [
    {
        imageUrl: "/img/banner1.png",
        name: "Welcome",
        description: "To your new favorite poker platform. Bones Poker brings a new level of poker to Solana blockchain.",
        btn: "+ Play",
        link: "/collection/asac.near/Antisocial Ape Club"
    },
    {
        imageUrl: "/img/banner1.png",
        name: "Welcome",
        description: "To your new favorite poker platform. Bones Poker brings a new level of poker to Solana blockchain.",
        link: "/collection/nearton_nft.near/NEARton",
        btn: "+ Play"
    },
    {
        imageUrl: "/img/banner1.png",
        name: "Welcome",
        description: "To your new favorite poker platform. Bones Poker brings a new level of poker to Solana blockchain.",
        link: "/collection/secretskelliessociety.near/Secret Skellies Society",
        btn: "+ Play"
    },
];
var HeroSection = function () {
    return (React.createElement("div", { className: styles.container },
        React.createElement(Carousel_1["default"], { controls: false }, exports.FEATURED_POST.map(function (post, i) {
            return (React.createElement(Carousel_1["default"].Item, { key: i },
                React.createElement("div", { className: styles.carouselContent },
                    React.createElement("div", { className: styles.textSection },
                        React.createElement("div", { className: styles.text },
                            React.createElement("p", { className: styles.title }, post.name),
                            React.createElement("p", { className: styles.description }, post.description)),
                        React.createElement("button", { className: styles.btn }, post.btn)),
                    React.createElement("div", { className: styles.imgSection },
                        React.createElement("img", { src: post.imageUrl, className: styles.bannerImg })))));
        }))));
};
exports["default"] = HeroSection;
