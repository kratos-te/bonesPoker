"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var MDBox_1 = require("components/MDBox");
var ComplexStatisticsCard_1 = require("examples/Cards/StatisticsCards/ComplexStatisticsCard");
function PrizeWidget() {
    return (React.createElement(material_1.Grid, { container: true, spacing: 3 },
        React.createElement(material_1.Grid, { item: true, xs: 12, md: 6, lg: 6 },
            React.createElement(MDBox_1["default"], { mb: 1.5 },
                React.createElement(ComplexStatisticsCard_1["default"], { color: "dark", icon: "redeem", title: "Daily Ranking", count: "3 $SOL", percentage: {
                        color: "success",
                        amount: "1x ",
                        label: "Bone Voyage NFT"
                    } }))),
        React.createElement(material_1.Grid, { item: true, xs: 12, md: 6, lg: 6 },
            React.createElement(MDBox_1["default"], { mb: 1.5 },
                React.createElement(ComplexStatisticsCard_1["default"], { icon: "redeem", title: "Monthly Ranking", count: "140 $SOL", percentage: {
                        color: "success",
                        amount: "1x ",
                        label: "Jelly rascal NFT"
                    } })))));
}
exports["default"] = PrizeWidget;
