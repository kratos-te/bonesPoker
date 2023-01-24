"use strict";
exports.__esModule = true;
exports.getShortWalletString = void 0;
exports.getShortWalletString = function (wallet, length) {
    if (length === void 0) { length = 6; }
    return wallet.slice(0, length) + "..." + wallet.slice(-length);
};
