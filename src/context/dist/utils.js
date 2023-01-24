"use strict";
exports.__esModule = true;
exports.sleep = void 0;
exports.sleep = function (ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
