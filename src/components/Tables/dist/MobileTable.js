"use strict";
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
var react_1 = require("react");
var scripts_1 = require("../../context/scripts");
var toastGroup_1 = require("../toastGroup");
var GameProvider_1 = require("../../context/GameProvider");
var router_1 = require("next/router");
var SocketProvider_1 = require("../../context/SocketProvider");
// import styles from './MobileTable.module.css';
var web3_js_1 = require("@solana/web3.js");
var image_1 = require("next/image");
var TemplateTable_1 = require("../../types/TemplateTable");
var wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
var styles = require("./MobileTable.module.css");
var MobileTable = function (_a) {
    var setLoading = _a.setLoading, loading = _a.loading, showAll = _a.showAll;
    var _b = GameProvider_1.useGame(), setMyPlayerId = _b.setMyPlayerId, setChat = _b.setChat, startGameStartCountdown = _b.startGameStartCountdown, startCountdown = _b.startCountdown, setGameStarted = _b.setGameStarted, setIsCountDown = _b.setIsCountDown, gameStartCountdownIntervalHandler = _b.gameStartCountdownIntervalHandler, countdownInteralHandler = _b.countdownInteralHandler, gamelist = _b.gamelist, setShowConfetti = _b.setShowConfetti, setCurrentGameMode = _b.setCurrentGameMode;
    var _c = react_1.useState(""), selectedGameId = _c[0], setSelectedGameId = _c[1];
    var wallet = wallet_adapter_react_1.useWallet();
    var socket = SocketProvider_1.useSocket().socket;
    var router = router_1.useRouter();
    var handleJoinGame = function (gameId, buyIn, initialStack, minBet, numSeat, count) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (loading) {
                toastGroup_1.errorAlert("Currently joining a game.");
                return [2 /*return*/];
            }
            setSelectedGameId(gameId);
            setLoading(true);
            if (!wallet || !wallet.connected || !wallet.publicKey) {
                toastGroup_1.errorAlert("Plz connect wallet first");
                setLoading(false);
                setSelectedGameId("");
                return [2 /*return*/];
            }
            if (!socket) {
                toastGroup_1.errorAlert("Socket disconnected, Plz check your network");
                setLoading(false);
                setSelectedGameId("");
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
                            setLoading(false);
                            setSelectedGameId("");
                            return [2 /*return*/];
                        case 1:
                            if (!wallet || !wallet.publicKey) {
                                toastGroup_1.errorAlert("Plz connect wallet first");
                                setLoading(false);
                                setSelectedGameId("");
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
                                    setShowConfetti(false);
                                    if (playerId) {
                                        setMyPlayerId(playerId);
                                        console.log("my player ID is ", playerId);
                                        setChat([]);
                                        setCurrentGameMode(TemplateTable_1.GameModes.TABLE);
                                        router.push("/table/" + gameId);
                                        setIsCountDown(true);
                                        if (gameStartedTmp) {
                                            // setGameStarted(true);
                                            startCountdown();
                                        }
                                        else {
                                            startGameStartCountdown();
                                        }
                                        setLoading(false);
                                        setSelectedGameId("");
                                        // if (count == numSeat - 1) {
                                        // } else {
                                        // }
                                    }
                                    else {
                                        setLoading(false);
                                        setSelectedGameId("");
                                        toastGroup_1.errorAlert("Join Table Failed!");
                                    }
                                });
                            }
                            else {
                                setLoading(false);
                                setSelectedGameId("");
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
    return (react_1["default"].createElement("div", { className: styles.container }, gamelist
        .slice(0, showAll ? gamelist.length : Math.min(5, gamelist.length))
        .map(function (game, i) {
        if (Number(game.count) != game.numSeats)
            return (react_1["default"].createElement("div", { key: i, className: styles.tableContainer + " " + (selectedGameId == game.gameId && loading && styles.borderYellow1) },
                react_1["default"].createElement("div", { className: styles.tableInfoContent },
                    react_1["default"].createElement("div", { className: styles.avatarContainer },
                        react_1["default"].createElement("img", { src: "/img/tableAvatar.png", className: styles.tableAvatar, alt: "table" })),
                    react_1["default"].createElement("div", { className: styles.tableInfo },
                        react_1["default"].createElement("p", { className: styles.tableTitle }, game.name),
                        react_1["default"].createElement("div", { className: styles.tableDetailInfoPanel },
                            react_1["default"].createElement("span", null,
                                react_1["default"].createElement("span", { className: styles.iconWrapper, style: { marginRight: 5 } },
                                    react_1["default"].createElement(image_1["default"], { src: "/img/bones-coin.png", width: "25px", height: "25px" })),
                                game.initialStack),
                            react_1["default"].createElement("span", null,
                                react_1["default"].createElement("span", { className: styles.iconWrapper, style: { marginRight: 5 } },
                                    react_1["default"].createElement(image_1["default"], { src: "/img/bones-coin.png", width: "25px", height: "25px" })),
                                game.minBet / 2,
                                " /",
                                game.minBet,
                                " Blinds"),
                            react_1["default"].createElement("span", null,
                                react_1["default"].createElement("span", { className: styles.iconWrapper, style: { marginRight: 5 } },
                                    react_1["default"].createElement(image_1["default"], { src: "/img/solana-logo.png", width: "25px", height: "25px" })),
                                game.buyIn / web3_js_1.LAMPORTS_PER_SOL,
                                " SOL"),
                            react_1["default"].createElement("span", null,
                                react_1["default"].createElement("span", { className: styles.iconWrapper },
                                    react_1["default"].createElement(image_1["default"], { src: "/img/profile.png", width: "25px", height: "25px" })),
                                game.count,
                                " /",
                                game.numSeats)))),
                selectedGameId == game.gameId && loading ? (react_1["default"].createElement("div", { className: styles.tableInfoFooter + " " + styles.bgYellow1 },
                    "joining table",
                    react_1["default"].createElement("div", { className: "lds-ellipsis" },
                        react_1["default"].createElement("div", null),
                        react_1["default"].createElement("div", null),
                        react_1["default"].createElement("div", null),
                        react_1["default"].createElement("div", null)))) : (react_1["default"].createElement("div", { className: styles.tableInfoFooter, onClick: function () {
                        return handleJoinGame(game.gameId, game.buyIn, game.initialStack, game.minBet, game.numSeats, game.count);
                    } }, "join"))));
    })));
};
exports["default"] = MobileTable;
