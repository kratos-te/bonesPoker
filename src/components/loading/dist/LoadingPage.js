"use strict";
exports.__esModule = true;
var ClipLoader_1 = require("react-spinners/ClipLoader");
var LoadingPage = function (_a) {
    var text = _a.text, color = _a.color;
    return (React.createElement("div", { className: "loading" },
        React.createElement(ClipLoader_1["default"], { color: color }),
        React.createElement("span", { style: { color: color } }, text)));
};
exports["default"] = LoadingPage;
