"use strict";
/* eslint-disable prettier/prettier */
/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Material Dashboard 2 PRO React TS components
var MDBox_1 = require("components/MDBox");
// Material Dashboard 2 PRO React TS examples components
var DataTable_1 = require("examples/Tables/DataTable");
// Data
var react_1 = require("react");
var router_1 = require("next/router");
var wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
var SocketProvider_1 = require("context/SocketProvider");
var toastGroup_1 = require("components/toastGroup");
var GameProvider_1 = require("context/GameProvider");
var scripts_1 = require("context/scripts");
var MobileTable_1 = require("components/Tables/MobileTable");
var dataTableTournament_1 = require("../../data/dataTableTournament");
var TournamentTable = function () {
    var _a = GameProvider_1.useGame(), setMyPlayerId = _a.setMyPlayerId, setChat = _a.setChat, startGameStartCountdown = _a.startGameStartCountdown, startCountdown = _a.startCountdown, setGameStarted = _a.setGameStarted, setIsCountDown = _a.setIsCountDown, gameStartCountdownIntervalHandler = _a.gameStartCountdownIntervalHandler, countdownInteralHandler = _a.countdownInteralHandler;
    var wallet = wallet_adapter_react_1.useWallet();
    var socket = SocketProvider_1.useSocket().socket;
    var router = router_1.useRouter();
    var _b = react_1.useState([]), tables = _b[0], setTables = _b[1];
    var _c = react_1.useState("existing"), menu = _c[0], setMenu = _c[1];
    var _d = react_1.useState([]), gamelist = _d[0], setGamelist = _d[1];
    var _e = react_1.useState(0), buyInFilter = _e[0], setBuyInFilter = _e[1];
    var _f = react_1.useState(false), loading = _f[0], setLoading = _f[1];
    var handleCreateGame = function (tableId) {
        socket === null || socket === void 0 ? void 0 : socket.emit("createGame", tableId, function (gameId) {
            router.push("/table/" + gameId);
        });
    };
    var handleJoinGame = function (gameId, buyIn, initialStack, minBet, numSeat, count) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!wallet || !wallet.connected || !wallet.publicKey) {
                toastGroup_1.errorAlert("Plz connect wallet first");
                return [2 /*return*/];
            }
            if (!socket) {
                toastGroup_1.errorAlert("Socket disconnected, Plz check your network");
                return [2 /*return*/];
            }
            socket.emit("isSitOnGame", gameId, wallet.publicKey.toBase58(), function (resultFlag) { return __awaiter(void 0, void 0, void 0, function () {
                var result;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("player trying to sit...", gameId, (_a = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58());
                            if (!resultFlag) return [3 /*break*/, 1];
                            toastGroup_1.errorAlert("Already Entered The Game");
                            return [2 /*return*/];
                        case 1:
                            if (!wallet || !wallet.publicKey) {
                                toastGroup_1.errorAlert("Plz connect wallet first");
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, scripts_1.enterTableOnChain(wallet, initialStack, buyIn, minBet, numSeat)];
                        case 2:
                            result = _b.sent();
                            console.log(result);
                            if (result.result == 0 && result.txId) {
                                if (gameStartCountdownIntervalHandler)
                                    clearInterval(gameStartCountdownIntervalHandler);
                                if (countdownInteralHandler)
                                    clearInterval(countdownInteralHandler);
                                socket.emit("sitOnGame", gameId, result.txId, wallet.publicKey.toBase58(), function (playerId, gameStartedTmp) {
                                    if (playerId) {
                                        setMyPlayerId(playerId);
                                        console.log("my player ID is ", playerId);
                                        setChat([]);
                                        router.push("/table/" + gameId);
                                        setIsCountDown(true);
                                        if (gameStartedTmp) {
                                            // setGameStarted(true);
                                            startCountdown();
                                        }
                                        else {
                                            startGameStartCountdown();
                                        }
                                        // if (count == numSeat - 1) {
                                        // } else {
                                        // }
                                    }
                                    else {
                                        toastGroup_1.errorAlert("Join Table Failed!");
                                    }
                                });
                            }
                            else {
                                toastGroup_1.errorAlert("Join Table Failed!");
                            }
                            _b.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        if (!socket)
            return;
        socket.emit("getExistingGames", function (activeGameList) {
            if (activeGameList && activeGameList.length > 0)
                setGamelist(activeGameList);
        });
        socket.emit("listTables", function (tables) {
            setTables(tables);
        });
        socket.on("activeGameUpdated", function (existingGames) {
            if (existingGames && existingGames.length > 0)
                setGamelist(existingGames);
        });
    }, [socket]);
    return (React.createElement(MDBox_1["default"], { my: 3 },
        React.createElement(DataTable_1["default"], { tableColumns: dataTableTournament_1["default"].columns, tableRows: gamelist, entriesPerPage: false, buyInFilter: buyInFilter, setLoading: setLoading, loading: loading }),
        React.createElement(MobileTable_1["default"], { setLoading: setLoading, loading: loading, showAll: true })));
};
exports["default"] = TournamentTable;
