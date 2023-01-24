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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useGame = void 0;
var react_1 = require("react");
var SocketProvider_1 = require("./SocketProvider");
var router_1 = require("next/router");
var utils_1 = require("./utils");
var toastGroup_1 = require("../components/toastGroup");
var Action_1 = require("../types/Action");
var TemplateTable_1 = require("../types/TemplateTable");
var AUTO_START_TIME = parseInt(process.env.REACT_APP_AUTO_START_TIME);
var AUTO_FOLD_TIME = parseInt(process.env.REACT_APP_AUTO_FOLD_TIME);
var context = react_1.createContext({
    countDown: AUTO_FOLD_TIME,
    setCountDown: function (_) { },
    isCountDown: true,
    setIsCountDown: function (flag) { },
    setMyPlayerId: function (_x) { },
    setCurrentPlayerId: function (_x) { },
    pots: [],
    setPots: function (_x) { },
    winners: null,
    setWinners: function (_x) { },
    bet: 0,
    setBet: function (_x) { },
    communityCards: [],
    setCommunityCards: function (_x) { },
    chat: [],
    setChat: function (_x) { },
    holeCards: [],
    setHoleCards: function (_x) { },
    gameStarted: false,
    setGameStarted: function (_x) { },
    setAllowedActions: function (_x) { },
    seats: {},
    setSeats: function (_x) { },
    numPlayers: 0,
    setNumPlayers: function (_x) { },
    setBestHand: function (_x) { },
    startCountdown: function (start) { },
    startGameStartCountdown: function () { },
    gameStartCountDown: AUTO_START_TIME,
    minusAmount: 0,
    gameStartMinusAmount: 0,
    gameStartCountdownIntervalHandler: undefined,
    countdownInteralHandler: undefined,
    winFlag: false,
    gamelist: [],
    showConfetti: false,
    setShowConfetti: function (_x) { },
    allCanOnlyCheck: false,
    presetRaising: "",
    setPresetRaising: function (_x) { },
    currentTableId: "",
    setCurrentTableId: function (_x) { },
    setForceFlag: function (_x) { },
    forceFlag: false,
    tournamentList: [],
    setTournamentList: function (_x) { },
    currentGameMode: TemplateTable_1.GameModes.TABLE,
    setCurrentGameMode: function (_x) { },
    dailyRankData: [],
    monthlyRankData: [],
    clearGameStartCountdown: function () { },
    clearCountdown: function () { },
    userName: "",
    userPfp: "",
    userAddress: "",
    inputUserName: "",
    inputUserPfp: "",
    setUserName: function (_x) { },
    setUserPfp: function (_x) { },
    setUserAddress: function (_x) { },
    setInputUserName: function (_x) { },
    setInputUserPfp: function (_x) { }
});
exports.useGame = function () { return react_1.useContext(context); };
var GameProvider = function (props) {
    var router = router_1.useRouter();
    var minusAmount = 0;
    var gameStartMinusAmount = 0;
    // let gameStartCountdownIntervalHandler: NodeJS.Timer;
    // let countdownInteralHandler: NodeJS.Timer;
    // eslint-disable-next-line prettier/prettier
    var _a = react_1.useState(), gameStartCountdownIntervalHandler = _a[0], setGameStartCountdownIntervalHandler = _a[1];
    var _b = react_1.useState(), countdownInteralHandler = _b[0], setCountdownInteralHandler = _b[1];
    var countDownRef = react_1.useRef();
    var _c = react_1.useState(AUTO_FOLD_TIME), countDown = _c[0], setCountDown = _c[1];
    var _d = react_1.useState(AUTO_START_TIME), gameStartCountDown = _d[0], setGameStartCountDown = _d[1];
    var _e = react_1.useState(true), isCountDown = _e[0], setIsCountDown = _e[1];
    var _f = react_1.useState(), myPlayerId = _f[0], setMyPlayerId = _f[1];
    var _g = react_1.useState(), currentPlayerId = _g[0], setCurrentPlayerId = _g[1];
    var _h = react_1.useState([]), pots = _h[0], setPots = _h[1];
    var _j = react_1.useState(null), winners = _j[0], setWinners = _j[1];
    var _k = react_1.useState(0), bet = _k[0], setBet = _k[1];
    var _l = react_1.useState([]), communityCards = _l[0], setCommunityCards = _l[1];
    var _m = react_1.useState([]), chat = _m[0], setChat = _m[1];
    var _o = react_1.useState([]), holeCards = _o[0], setHoleCards = _o[1];
    var _p = react_1.useState(false), gameStarted = _p[0], setGameStarted = _p[1];
    var _q = react_1.useState(), allowedActions = _q[0], setAllowedActions = _q[1];
    var _r = react_1.useState({}), seats = _r[0], setSeats = _r[1];
    var _s = react_1.useState(0), numPlayers = _s[0], setNumPlayers = _s[1];
    var _t = react_1.useState(), bestHand = _t[0], setBestHand = _t[1];
    var socket = SocketProvider_1.useSocket().socket;
    var _u = react_1.useState(false), forceFlag = _u[0], setForceFlag = _u[1];
    var _v = react_1.useState(false), winFlag = _v[0], setWinFlag = _v[1];
    var _w = react_1.useState([]), gamelist = _w[0], setGamelist = _w[1];
    var _y = react_1.useState(false), showConfetti = _y[0], setShowConfetti = _y[1];
    var _z = react_1.useState(false), allCanOnlyCheck = _z[0], setAllCanOnlyCheck = _z[1];
    var _0 = react_1.useState(""), presetRaising = _0[0], setPresetRaising = _0[1];
    var _1 = react_1.useState(""), currentTableId = _1[0], setCurrentTableId = _1[1];
    var _2 = react_1.useState([]), tournamentList = _2[0], setTournamentList = _2[1];
    var _3 = react_1.useState(TemplateTable_1.GameModes.TABLE), currentGameMode = _3[0], setCurrentGameMode = _3[1];
    var _4 = react_1.useState([]), dailyRankData = _4[0], setDailyRankData = _4[1];
    var _5 = react_1.useState([]), monthlyRankData = _5[0], setMonthlyRankData = _5[1];
    // user profile info in global
    var _6 = react_1.useState(""), userName = _6[0], setUserName = _6[1];
    var _7 = react_1.useState(""), userPfp = _7[0], setUserPfp = _7[1];
    var _8 = react_1.useState(""), userAddress = _8[0], setUserAddress = _8[1];
    var _9 = react_1.useState(""), inputUserName = _9[0], setInputUserName = _9[1];
    var _10 = react_1.useState(""), inputUserPfp = _10[0], setInputUserPfp = _10[1];
    function canDoAction(action, allowedActions) {
        return Boolean(allowedActions.actions[action]);
    }
    function canCall(allowedActions) {
        return canDoAction(Action_1.Action.CALL, allowedActions);
    }
    function canCheck(allowedActions) {
        return canDoAction(Action_1.Action.CHECK, allowedActions);
    }
    function canRaise(allowedActions) {
        return canDoAction(Action_1.Action.RAISE, allowedActions);
    }
    function canFold(allowedActions) {
        return canDoAction(Action_1.Action.FOLD, allowedActions);
    }
    function canAllIn(allowedActions) {
        return canDoAction(Action_1.Action.ALL_IN, allowedActions);
    }
    var startGameStartCountdown = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tmp;
        return __generator(this, function (_a) {
            gameStartMinusAmount = 0;
            tmp = setInterval(function () {
                if (gameStartCountDown == 0 || gameStartMinusAmount == AUTO_START_TIME - 1) {
                    gameStartMinusAmount = 0;
                    setGameStartCountDown(AUTO_START_TIME - 1); //AUTO_START_TIME
                }
                else {
                    setGameStartCountDown(AUTO_START_TIME - gameStartMinusAmount); //AUTO_START_TIME - gameStartMinusAmount
                    gameStartMinusAmount += 1;
                }
            }, 1000);
            setGameStartCountdownIntervalHandler(tmp);
            return [2 /*return*/];
        });
    }); };
    var startCountdown = function (_start) { return __awaiter(void 0, void 0, void 0, function () {
        var tmp;
        return __generator(this, function (_a) {
            console.log("==================================== countdown started");
            // for (let i = 0; i <= 30; i++) {
            //   await sleep(1000);
            //   if (countDown == 0) {
            //     i = 0;
            //     setCountDown(i);
            //   } else {
            //     let updated = countDown - 1;
            //     setCountDown(updated);
            //     setForceFlag(!forceFlag)
            //   }
            // }
            if (_start) {
                countDownRef.current = _start;
            }
            minusAmount = 0;
            tmp = setInterval(function () {
                if (countDown == 0 || minusAmount == AUTO_FOLD_TIME - 1) {
                    minusAmount = 0;
                    setCountDown(AUTO_FOLD_TIME);
                }
                else {
                    // minusAmount += 1;
                    if (!countDownRef.current)
                        return;
                    // eslint-disable-next-line prettier/prettier
                    setCountDown(countDownRef.current);
                    countDownRef.current = (countDownRef.current - 1);
                    // setForceFlag(!forceFlag)
                }
            }, 1000);
            setCountdownInteralHandler(tmp);
            return [2 /*return*/];
        });
    }); };
    var clearGameStartCountdown = function () {
        if (gameStartCountdownIntervalHandler)
            clearInterval(gameStartCountdownIntervalHandler);
    };
    var clearCountdown = function () {
        if (countdownInteralHandler)
            clearInterval(countdownInteralHandler);
    };
    react_1.useEffect(function () {
        console.log("presetRaising >> ", presetRaising);
    }, [forceFlag, presetRaising]);
    react_1.useEffect(function () {
        console.log(">> currentPlayerId : ", currentPlayerId);
    }, [currentPlayerId]);
    react_1.useEffect(function () {
        countDownRef.current = AUTO_FOLD_TIME;
        if (!socket)
            return;
        socket.on("resitTournamentTable", function (gameId) {
            router.push("/table/" + gameId);
        });
        socket.on("activeTournamentUpdated", function (_activeTournamentlist) {
            setTournamentList(_activeTournamentlist);
        });
        socket.emit("getLeaderboardData", function (dailyRankData, monthlyRankData) {
            setDailyRankData(dailyRankData);
            setMonthlyRankData(monthlyRankData);
        });
        socket.emit("getExistingTournaments", function (_tournamentList) {
            console.log("existing tournamensts >> ", _tournamentList);
            if (_tournamentList)
                setTournamentList(_tournamentList);
            else
                setTournamentList([]);
        });
        socket.emit("getExistingGames", function (activeGameList) {
            if (activeGameList && activeGameList.length > 0)
                setGamelist(activeGameList);
        });
        socket.on("activeGameUpdated", function (existingGames) {
            if (existingGames)
                setGamelist(existingGames);
            // minusAmount = 0;
            gameStartMinusAmount = 0;
            // setCountDown(AUTO_FOLD_TIME)
            setGameStartCountDown(AUTO_START_TIME);
            setForceFlag(!forceFlag);
        });
        socket.on("turnChangedTo", function (playerId, allowedActions) {
            console.log(">> turn changed to > ", playerId, allowedActions);
            console.log("currentPlayerId", currentPlayerId);
            console.log("gameStarted", gameStarted);
            console.log("seats", seats);
            console.log("myPlayerId", myPlayerId);
            console.log("showPreviousWinners");
            minusAmount = 0;
            gameStartMinusAmount = 0;
            // setCountDown(AUTO_FOLD_TIME)
            countDownRef.current = AUTO_FOLD_TIME;
            setCountDown(AUTO_FOLD_TIME);
            setGameStartCountDown(AUTO_START_TIME);
            setForceFlag(!forceFlag);
            // setTimeout(() => {
            //   startGameStartCountdown();
            //   startCountdown();
            // }, 1000)
            // setCountDown(AUTO_FOLD_TIME);
            // minusAmount = 0
            // setGameStartCountDown(AUTO_START_TIME);
            // gameStartMinusAmount = 0
            // console.log("1. current turn playerID && my playerId :::: ", playerId, myPlayerId)
            // if (playerId == myPlayerId) {
            //   //
            //   let prevPlayerIdTmp = currentPlayerId;
            //   setTimeout(() => {
            //     if (prevPlayerIdTmp != myPlayerId) {
            //       let query = router.query;
            //       // console.log(router, "router")
            //       socket.emit("leave", (query.tableId as string));
            //     }
            //   }, 30000);
            // }
            setCurrentPlayerId(playerId !== null && playerId !== void 0 ? playerId : undefined);
            setAllowedActions(allowedActions);
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            // console.log("myPlayerId ", myPlayerId)
            // console.log("playerId ", playerId)
            if (allowedActions) {
                // console.log("can raise >> ", canRaise(allowedActions))
            }
            // if (myPlayerId == playerId && allowedActions && canRaise(allowedActions) && presetRaising != "") {
            //   let raiseAmount = 0;
            //   if (pots && pots.length > 0 && pots[pots.length - 1].total > 0) {
            //     if (presetRaising == PRESET_RAISING_BUTTON[0]) {
            //       raiseAmount = Math.min(Math.max(Math.floor(pots[pots.length - 1].total / 2), allowedActions.params.minRaise), allowedActions.params.maxBet);
            //       socket.emit("raise", currentTableId, raiseAmount);
            //     } else if (presetRaising == PRESET_RAISING_BUTTON[1]) {
            //       raiseAmount = Math.min(Math.max(Math.floor(pots[pots.length - 1].total), allowedActions.params.minRaise), allowedActions.params.maxBet);
            //       socket.emit("raise", currentTableId, raiseAmount);
            //     } else if (presetRaising == PRESET_RAISING_BUTTON[2]) {
            //       socket.emit("allIn", currentTableId);
            //     }
            //     setPresetRaising("")
            //   }
            // }
        });
        socket.on("potsUpdated", function (pots) {
            // console.log("potsUpdated", pots);
            console.log(" >> ----------- pot updated ", pots);
            setPots(pots);
        });
        socket.on("winners", function (returnedWinners, finalFlag) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // console.log("winners", returnedWinners);
                        if (returnedWinners) {
                            setWinFlag(true);
                            // setTimeout(() => {
                            setWinners(returnedWinners);
                            // }, 3000);
                        }
                        else {
                            setWinners(returnedWinners);
                            setWinFlag(false);
                            setPresetRaising("");
                        }
                        if (!finalFlag) return [3 /*break*/, 4];
                        if (!returnedWinners)
                            return [2 /*return*/];
                        return [4 /*yield*/, utils_1.sleep(4000)];
                    case 1:
                        _a.sent();
                        if (returnedWinners[0].playerId == myPlayerId) {
                            setShowConfetti(true);
                            toastGroup_1.successAlert("You Won!");
                        }
                        else {
                            toastGroup_1.errorAlert("You Lost!");
                        }
                        setIsCountDown(false);
                        if (!(currentGameMode == TemplateTable_1.GameModes.TABLE)) return [3 /*break*/, 3];
                        return [4 /*yield*/, utils_1.sleep(5000)];
                    case 2:
                        _a.sent();
                        router.push("/tables");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        socket.on("betUpdated", function (bet) {
            setBet(bet);
        });
        socket.on("communityCardsUpdated", function (communityCards) {
            setCommunityCards(communityCards);
        });
        socket.on("log", function (msg, ts) {
            chat.unshift({ msg: msg, ts: new Date(ts) });
            setChat(__spreadArrays(chat));
            // setGameStartCountDown(AUTO_START_TIME);
            // gameStartMinusAmount = 0
            // setCountDown(AUTO_FOLD_TIME);
            // minusAmount = 0
        });
        socket.on("holeCards", function (cards) {
            setHoleCards(cards);
        });
        socket.on("gameStarted", function () {
            setShowConfetti(false);
            console.log("game started...");
            setGameStarted(true);
            setChat([]);
            clearCountdown();
            clearGameStartCountdown();
            // startGameStartCountdown();
            setTimeout(function () {
                console.log(">>>>>>>>>>>>>>>>>>>>>>> countdown started at GameStarted");
                startCountdown();
            }, 1000);
            // setGameStartCountDown(AUTO_FOLD_TIME);
            // gameStartMinusAmount = 0
            // startCountdown();
            // setIsCountDown(true);
            // setTimeout(() => {
            //   console.log(isCountDown)
            // }, 1000);
        });
        socket.on("seatsUpdated", function (seats, numPlayers, _allCanOnlyCheck) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setAllCanOnlyCheck(_allCanOnlyCheck);
                minusAmount = 0;
                gameStartMinusAmount = 0;
                // setCountDown(AUTO_FOLD_TIME)
                setGameStartCountDown(AUTO_START_TIME);
                setForceFlag(!forceFlag);
                // console.log("seatsUpdated", seats, _allCanOnlyCheck);
                setSeats(seats);
                setNumPlayers(numPlayers);
                return [2 /*return*/];
            });
        }); });
        socket.on("bestHand", function (hand) {
            // console.log("bestHand", hand);
            setBestHand(hand);
        });
        return function () {
            socket.off("turnChangedTo");
            socket.off("potsUpdated");
            socket.off("winners");
            socket.off("betUpdated");
            socket.off("communityCardsUpdated");
            socket.off("log");
            socket.off("holeCards");
            socket.off("gameStarted");
            socket.off("seatsUpdated");
        };
    }, [socket, myPlayerId, presetRaising, pots]);
    return (React.createElement(context.Provider, { value: {
            countDown: countDown,
            setCountDown: setCountDown,
            isCountDown: isCountDown,
            setIsCountDown: setIsCountDown,
            myPlayerId: myPlayerId,
            setMyPlayerId: setMyPlayerId,
            currentPlayerId: currentPlayerId,
            setCurrentPlayerId: setCurrentPlayerId,
            pots: pots,
            setPots: setPots,
            winners: winners,
            setWinners: setWinners,
            bet: bet,
            setBet: setBet,
            communityCards: communityCards,
            setCommunityCards: setCommunityCards,
            chat: chat,
            setChat: setChat,
            holeCards: holeCards,
            setHoleCards: setHoleCards,
            gameStarted: gameStarted,
            setGameStarted: setGameStarted,
            allowedActions: allowedActions,
            setAllowedActions: setAllowedActions,
            seats: seats,
            setSeats: setSeats,
            numPlayers: numPlayers,
            setNumPlayers: setNumPlayers,
            bestHand: bestHand,
            setBestHand: setBestHand,
            startCountdown: startCountdown,
            startGameStartCountdown: startGameStartCountdown,
            gameStartCountDown: gameStartCountDown,
            minusAmount: minusAmount,
            gameStartMinusAmount: gameStartMinusAmount,
            gameStartCountdownIntervalHandler: gameStartCountdownIntervalHandler,
            countdownInteralHandler: countdownInteralHandler,
            winFlag: winFlag,
            gamelist: gamelist,
            showConfetti: showConfetti,
            setShowConfetti: setShowConfetti,
            allCanOnlyCheck: allCanOnlyCheck,
            presetRaising: presetRaising,
            setPresetRaising: setPresetRaising,
            currentTableId: currentTableId,
            setCurrentTableId: setCurrentTableId,
            setForceFlag: setForceFlag,
            forceFlag: forceFlag,
            tournamentList: tournamentList,
            setTournamentList: setTournamentList,
            currentGameMode: currentGameMode,
            setCurrentGameMode: setCurrentGameMode,
            dailyRankData: dailyRankData,
            monthlyRankData: monthlyRankData,
            clearGameStartCountdown: clearGameStartCountdown,
            clearCountdown: clearCountdown,
            userName: userName,
            userPfp: userPfp,
            userAddress: userAddress,
            inputUserName: inputUserName,
            inputUserPfp: inputUserPfp,
            setUserName: setUserName,
            setUserPfp: setUserPfp,
            setUserAddress: setUserAddress,
            setInputUserName: setInputUserName,
            setInputUserPfp: setInputUserPfp
        } }, props.children));
};
exports["default"] = GameProvider;
