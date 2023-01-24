import {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  FC,
  useEffect,
  useRef,
} from "react";
import { AllowedActions } from "../types/AllowedActions";
import { Card } from "../types/Card";
import { LogLine } from "../types/LogLine";
import { Pot } from "../types/Pot";
import { Seats } from "../types/Seats";
import { Winner } from "../types/Winner";
import { useSocket } from "./SocketProvider";
import { useRouter } from "next/router";
import { sleep } from "./utils";
import { PlayerRank } from "../types/Player";
import getConfig from "next/config";
import { ActiveGame } from "../types/Game";
import { errorAlert, successAlert } from "../components/toastGroup";
import { Action } from "../types/Action";
import { Tournament } from "../types/TournamentTable";
import { GameModes } from "../types/TemplateTable";

const AUTO_START_TIME: number | undefined = parseInt(process.env.REACT_APP_AUTO_START_TIME);
const AUTO_FOLD_TIME: number | undefined = parseInt(process.env.REACT_APP_AUTO_FOLD_TIME);

interface Context {
  countDown: number;
  setCountDown: (_: number) => void;
  isCountDown: boolean;
  setIsCountDown: (flag: boolean) => void;
  myPlayerId?: string;
  setMyPlayerId: (_x: string) => void;
  currentPlayerId?: string;
  setCurrentPlayerId: (_x: string) => void;
  pots: Pot[];
  setPots: (_x: Pot[]) => void;
  winners: Winner[] | null;
  setWinners: (_x: Winner[] | null) => void;
  bet: number;
  setBet: (_x: number) => void;
  communityCards: Card[];
  setCommunityCards: (_x: Card[]) => void;
  chat: LogLine[];
  setChat: (_x: LogLine[]) => void;
  holeCards: Card[];
  setHoleCards: (_x: Card[]) => void;
  gameStarted: boolean;
  setGameStarted: (_x: boolean) => void;
  allowedActions?: AllowedActions;
  setAllowedActions: (_x: AllowedActions) => void;
  seats: Seats;
  setSeats: (_x: Seats) => void;
  numPlayers: number;
  setNumPlayers: (_x: number) => void;
  bestHand?: string;
  setBestHand: (_x: string) => void;
  startCountdown: (start?: number) => void;
  startGameStartCountdown: () => void;
  gameStartCountDown: number;
  minusAmount: number;
  gameStartMinusAmount: number;
  gameStartCountdownIntervalHandler: NodeJS.Timer | undefined;
  countdownInteralHandler: NodeJS.Timer | undefined;
  winFlag: boolean;
  gamelist: ActiveGame[];
  showConfetti: boolean;
  setShowConfetti: (_x: boolean) => void;
  allCanOnlyCheck: boolean;
  presetRaising: string;
  setPresetRaising: (_x: string) => void;
  currentTableId: string;
  setCurrentTableId: (_x: string) => void;
  setForceFlag: (_x: boolean) => void;
  forceFlag: boolean;
  tournamentList: Tournament[];
  setTournamentList: (_x: Tournament[]) => void;
  currentGameMode: GameModes;
  setCurrentGameMode: (_x: GameModes) => void;
  dailyRankData: PlayerRank[];
  monthlyRankData: PlayerRank[];
  clearGameStartCountdown: () => void;
  clearCountdown: () => void;
  userName: string;
  userPfp: string;
  userAddress: string;
  inputUserName: string;
  inputUserPfp: string;
  setUserName: (_x: string) => void;
  setUserPfp: (_x: string) => void;
  setUserAddress: (_x: string) => void;
  setInputUserName: (_x: string) => void;
  setInputUserPfp: (_x: string) => void;
}

const context = createContext<Context>({
  countDown: AUTO_FOLD_TIME,
  setCountDown: (_: number) => {},
  isCountDown: true,
  setIsCountDown: (flag: boolean) => {},
  setMyPlayerId: (_x: string) => {},
  setCurrentPlayerId: (_x: string) => {},
  pots: [],
  setPots: (_x: Pot[]) => {},
  winners: null,
  setWinners: (_x: Winner[] | null) => {},
  bet: 0,
  setBet: (_x: number) => {},
  communityCards: [],
  setCommunityCards: (_x: Card[]) => {},
  chat: [],
  setChat: (_x: LogLine[]) => {},
  holeCards: [],
  setHoleCards: (_x: Card[]) => {},
  gameStarted: false,
  setGameStarted: (_x: boolean) => {},
  setAllowedActions: (_x: AllowedActions) => {},
  seats: {},
  setSeats: (_x: Seats) => {},
  numPlayers: 0,
  setNumPlayers: (_x: number) => {},
  setBestHand: (_x: string) => {},
  startCountdown: (start?: number) => {},
  startGameStartCountdown: () => {},
  gameStartCountDown: AUTO_START_TIME,
  minusAmount: 0,
  gameStartMinusAmount: 0,
  gameStartCountdownIntervalHandler: undefined,
  countdownInteralHandler: undefined,
  winFlag: false,
  gamelist: [],
  showConfetti: false,
  setShowConfetti: (_x: boolean) => {},
  allCanOnlyCheck: false,
  presetRaising: "",
  setPresetRaising: (_x: string) => {},
  currentTableId: "",
  setCurrentTableId: (_x: string) => {},
  setForceFlag: (_x: boolean) => {},
  forceFlag: false,
  tournamentList: [],
  setTournamentList: (_x: Tournament[]) => {},
  currentGameMode: GameModes.TABLE,
  setCurrentGameMode: (_x: GameModes) => {},
  dailyRankData: [],
  monthlyRankData: [],
  clearGameStartCountdown: () => {},
  clearCountdown: () => {},
  userName: "",
  userPfp: "",
  userAddress: "",
  inputUserName: "",
  inputUserPfp: "",
  setUserName: (_x: string) => {},
  setUserPfp: (_x: string) => {},
  setUserAddress: (_x: string) => {},
  setInputUserName: (_x: string) => {},
  setInputUserPfp: (_x: string) => {},
});

export const useGame = () => useContext(context);

const GameProvider = (props: { children: any }) => {
  const router = useRouter();
  let minusAmount = 0;
  let gameStartMinusAmount = 0;
  // let gameStartCountdownIntervalHandler: NodeJS.Timer;
  // let countdownInteralHandler: NodeJS.Timer;
  // eslint-disable-next-line prettier/prettier
  const [gameStartCountdownIntervalHandler, setGameStartCountdownIntervalHandler] = useState<
    NodeJS.Timer
  >();
  const [countdownInteralHandler, setCountdownInteralHandler] = useState<NodeJS.Timer>();
  const countDownRef = useRef<number>();

  const [countDown, setCountDown] = useState<number>(AUTO_FOLD_TIME);
  const [gameStartCountDown, setGameStartCountDown] = useState<number>(AUTO_START_TIME);
  const [isCountDown, setIsCountDown] = useState<boolean>(true);

  const [myPlayerId, setMyPlayerId] = useState<string>();
  const [currentPlayerId, setCurrentPlayerId] = useState<string>();
  const [pots, setPots] = useState<Pot[]>([]);
  const [winners, setWinners] = useState<Winner[] | null>(null);
  const [bet, setBet] = useState<number>(0);
  const [communityCards, setCommunityCards] = useState<Card[]>([]);
  const [chat, setChat] = useState<LogLine[]>([]);
  const [holeCards, setHoleCards] = useState<Card[]>([]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [allowedActions, setAllowedActions] = useState<AllowedActions>();
  const [seats, setSeats] = useState<Seats>({});
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [bestHand, setBestHand] = useState<string>();
  const { socket } = useSocket();
  const [forceFlag, setForceFlag] = useState<boolean>(false);

  const [winFlag, setWinFlag] = useState<boolean>(false);
  const [gamelist, setGamelist] = useState<ActiveGame[]>([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [allCanOnlyCheck, setAllCanOnlyCheck] = useState<boolean>(false);
  const [presetRaising, setPresetRaising] = useState<string>("");
  const [currentTableId, setCurrentTableId] = useState<string>("");

  const [tournamentList, setTournamentList] = useState<Tournament[]>([]);
  const [currentGameMode, setCurrentGameMode] = useState<GameModes>(GameModes.TABLE);

  const [dailyRankData, setDailyRankData] = useState<PlayerRank[]>([]);
  const [monthlyRankData, setMonthlyRankData] = useState<PlayerRank[]>([]);

  // user profile info in global
  const [userName, setUserName] = useState<string>("");
  const [userPfp, setUserPfp] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [inputUserName, setInputUserName] = useState<string>("");
  const [inputUserPfp, setInputUserPfp] = useState<string>("");

  function canDoAction(action: Action, allowedActions: AllowedActions): boolean {
    return Boolean(allowedActions.actions[action]);
  }

  function canCall(allowedActions: AllowedActions): boolean {
    return canDoAction(Action.CALL, allowedActions);
  }

  function canCheck(allowedActions: AllowedActions): boolean {
    return canDoAction(Action.CHECK, allowedActions);
  }

  function canRaise(allowedActions: AllowedActions): boolean {
    return canDoAction(Action.RAISE, allowedActions);
  }

  function canFold(allowedActions: AllowedActions): boolean {
    return canDoAction(Action.FOLD, allowedActions);
  }

  function canAllIn(allowedActions: AllowedActions): boolean {
    return canDoAction(Action.ALL_IN, allowedActions);
  }

  const startGameStartCountdown = async () => {
    gameStartMinusAmount = 0;
    let tmp = setInterval(() => {
      if (gameStartCountDown == 0 || gameStartMinusAmount == AUTO_START_TIME - 1) {
        gameStartMinusAmount = 0;
        setGameStartCountDown(AUTO_START_TIME - 1); //AUTO_START_TIME
      } else {
        setGameStartCountDown(AUTO_START_TIME - gameStartMinusAmount); //AUTO_START_TIME - gameStartMinusAmount
        gameStartMinusAmount += 1;
      }
    }, 1000);
    setGameStartCountdownIntervalHandler(tmp);
  };

  const startCountdown = async (_start?: number) => {
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
      countDownRef.current = _start as any;
    }

    minusAmount = 0;
    let tmp = setInterval(() => {
      if (countDown == 0 || minusAmount == AUTO_FOLD_TIME - 1) {
        minusAmount = 0;
        setCountDown(AUTO_FOLD_TIME);
      } else {
        // minusAmount += 1;
        if (!countDownRef.current) return;
        // eslint-disable-next-line prettier/prettier
        setCountDown((countDownRef.current as unknown) as number);
        countDownRef.current = (countDownRef.current - 1) as never;

        // setForceFlag(!forceFlag)
      }
    }, 1000);
    setCountdownInteralHandler(tmp);
  };

  const clearGameStartCountdown = () => {
    if (gameStartCountdownIntervalHandler) clearInterval(gameStartCountdownIntervalHandler);
  };

  const clearCountdown = () => {
    if (countdownInteralHandler) clearInterval(countdownInteralHandler);
  };

  useEffect(() => {
    console.log("presetRaising >> ", presetRaising);
  }, [forceFlag, presetRaising]);

  useEffect(() => {
    console.log(">> currentPlayerId : ", currentPlayerId);
  }, [currentPlayerId]);

  useEffect(() => {
    countDownRef.current = AUTO_FOLD_TIME;
    if (!socket) return;

    socket.on("resitTournamentTable", (gameId: string) => {
      router.push(`/table/${gameId}`);
    });

    socket.on("activeTournamentUpdated", (_activeTournamentlist: Tournament[]) => {
      setTournamentList(_activeTournamentlist);
    });

    socket.emit("getLeaderboardData", (dailyRankData, monthlyRankData) => {
      setDailyRankData(dailyRankData);
      setMonthlyRankData(monthlyRankData);
    });

    socket.emit("getExistingTournaments", (_tournamentList: Tournament[]) => {
      console.log("existing tournamensts >> ", _tournamentList);
      if (_tournamentList) setTournamentList(_tournamentList);
      else setTournamentList([]);
    });

    socket.emit("getExistingGames", (activeGameList: ActiveGame[]) => {
      if (activeGameList && activeGameList.length > 0) setGamelist(activeGameList);
    });

    socket.on("activeGameUpdated", (existingGames) => {
      if (existingGames) setGamelist(existingGames);

      // minusAmount = 0;
      gameStartMinusAmount = 0;
      // setCountDown(AUTO_FOLD_TIME)
      setGameStartCountDown(AUTO_START_TIME);
      setForceFlag(!forceFlag);
    });

    socket.on("turnChangedTo", (playerId, allowedActions) => {
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

      setCurrentPlayerId(playerId ?? undefined);
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
    socket.on("potsUpdated", (pots: Pot[]) => {
      // console.log("potsUpdated", pots);
      console.log(" >> ----------- pot updated ", pots);

      setPots(pots);
    });
    socket.on("winners", async (returnedWinners, finalFlag) => {
      // console.log("winners", returnedWinners);

      if (returnedWinners) {
        setWinFlag(true);
        // setTimeout(() => {
        setWinners(returnedWinners);

        // }, 3000);
      } else {
        setWinners(returnedWinners);
        setWinFlag(false);
        setPresetRaising("");
      }

      // setIsCountDown(false);
      // setGameStarted(false);
      if (finalFlag) {
        if (!returnedWinners) return;
        await sleep(4000);
        if (returnedWinners[0].playerId == myPlayerId) {
          setShowConfetti(true);

          successAlert("You Won!");
        } else {
          errorAlert("You Lost!");
        }
        setIsCountDown(false);
        // if (Object.values(seats).length > 0) lastPlayFlag = Object.values(seats).filter((player: Player) => player.stack > 0);

        //  if (Object.values(seats).length > 0 && Object.values(seats).filter((player: Player) => player && player.stack && player.stack > 0).length == 1) {

        if (currentGameMode == GameModes.TABLE) {
          await sleep(5000);
          router.push(`/tables`);
        }

        // }
      } else {
        // setTimeout(() => {
        //   if (!returnedWinners) return;
        //   console.log(seats);
        //   console.log(myPlayerId);
        //   let result = Object.entries(seats).map(([seatId, player], i) => {
        //     console.log(" >>> ", player.id, myPlayerId);
        //     if (player.id == myPlayerId) {
        //       return true;
        //     } else return false;
        //   });
        //   if (!result.includes(true)) {
        //     router.push(`/tables`);
        //   }
        // }, 5000);
      }
    });

    socket.on("betUpdated", (bet) => {
      setBet(bet);
    });

    socket.on("communityCardsUpdated", (communityCards) => {
      setCommunityCards(communityCards);
    });
    socket.on("log", (msg, ts) => {
      chat.unshift({ msg, ts: new Date(ts) });
      setChat([...chat]);
      // setGameStartCountDown(AUTO_START_TIME);
      // gameStartMinusAmount = 0
      // setCountDown(AUTO_FOLD_TIME);
      // minusAmount = 0
    });
    socket.on("holeCards", (cards) => {
      setHoleCards(cards);
    });
    socket.on("gameStarted", () => {
      setShowConfetti(false);

      console.log("game started...");
      setGameStarted(true);
      setChat([]);

      clearCountdown();
      clearGameStartCountdown();
      // startGameStartCountdown();
      setTimeout(() => {
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
    socket.on("seatsUpdated", async (seats: Seats, numPlayers: number, _allCanOnlyCheck) => {
      setAllCanOnlyCheck(_allCanOnlyCheck);

      minusAmount = 0;
      gameStartMinusAmount = 0;
      // setCountDown(AUTO_FOLD_TIME)
      setGameStartCountDown(AUTO_START_TIME);
      setForceFlag(!forceFlag);

      // console.log("seatsUpdated", seats, _allCanOnlyCheck);

      setSeats(seats);
      setNumPlayers(numPlayers);
      // for (let i = 0; i < 101; i++) {
      //   await sleep(20);

      // }

      // clearInterval(gameStartCountdownIntervalHandler);
      // clearInterval(countdownInteralHandler);
      // setTimeout(() => {
      //   startGameStartCountdown();
      //   startCountdown();
      // }, 1000);

      // setCountDown(AUTO_FOLD_TIME);
      // minusAmount = 0
      // setGameStartCountDown(AUTO_START_TIME);
      // gameStartMinusAmount = 0
      // if (gameStarted) {
      // } else {
      // }
    });
    socket.on("bestHand", (hand) => {
      // console.log("bestHand", hand);
      setBestHand(hand);
    });

    return () => {
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
  return (
    <context.Provider
      value={{
        countDown,
        setCountDown,
        isCountDown,
        setIsCountDown,
        myPlayerId,
        setMyPlayerId,
        currentPlayerId,
        setCurrentPlayerId,
        pots,
        setPots,
        winners,
        setWinners,
        bet,
        setBet,
        communityCards,
        setCommunityCards,
        chat,
        setChat,
        holeCards,
        setHoleCards,
        gameStarted,
        setGameStarted,
        allowedActions,
        setAllowedActions,
        seats,
        setSeats,
        numPlayers,
        setNumPlayers,
        bestHand,
        setBestHand,
        startCountdown,
        startGameStartCountdown,
        gameStartCountDown,
        minusAmount,
        gameStartMinusAmount,
        gameStartCountdownIntervalHandler,
        countdownInteralHandler,
        winFlag,
        gamelist,
        showConfetti,
        setShowConfetti,
        allCanOnlyCheck,
        presetRaising,
        setPresetRaising,
        currentTableId,
        setCurrentTableId,
        setForceFlag,
        forceFlag,
        tournamentList,
        setTournamentList,
        currentGameMode,
        setCurrentGameMode,
        dailyRankData,
        monthlyRankData,
        clearGameStartCountdown,
        clearCountdown,
        userName,
        userPfp,
        userAddress,
        inputUserName,
        inputUserPfp,
        setUserName,
        setUserPfp,
        setUserAddress,
        setInputUserName,
        setInputUserPfp,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default GameProvider;
