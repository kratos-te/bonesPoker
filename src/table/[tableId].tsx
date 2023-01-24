import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Table.module.css";
import Seat from "../examples/Seat";
import { GetServerSideProps } from "next";
import { getStringQueryParam } from "../utils/QueryParams";
import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useGame } from "../context/GameProvider";
import CommunityCards from "../examples/CommunityCards";
import { Street } from "../types/Street";
import { Card } from "../types/Card";
import { Action } from "../types/Action";
import { AllowedActions } from "../types/AllowedActions";
import Image from "next/image";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Confetti, ConfettiProvider } from "../components/Confetti";

import { winCup as WinCupIcon, refresh as RefreshIcon } from "../examples/svgIcons";
import { Winner } from "../types/Winner";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { errorAlert } from "../components/toastGroup";
import { BlindIncreaseModes } from "../types/TemplateTable";
import { useWallet } from "@solana/wallet-adapter-react";

const PRESET_RAISING_BUTTON = ["1/2 pot", "pot", "all-in"];

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tableId = getStringQueryParam(context.query.tableId);
  return {
    props: {
      tableId,
    },
  };
};

// TODO: add table does not exist error if tableId is invalid
const Table: NextPage<{ tableId: string }> = ({ tableId }) => {
  const router = useRouter();

  const wallet = useWallet();
  const { socket } = useSocket();
  const [raiseAmount, setRaiseAmount] = useState<number>(0);
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [bigBlindBet, setBigBlindBet] = useState<number>(0);
  const [smallBlindBet, setSmallBlindBet] = useState<number>(0);
  const [initStack, setInitStack] = useState<number>(0);
  const [numSeats, setNumSeats] = useState<number>(0);
  const [buyIn, setBuyIn] = useState<number>(0);
  const [infoMenuOpen, setInfoMenuOpen] = useState<boolean>(false);
  const [winPrizeMenuOpen, setWinPrizeMenuOpen] = useState<boolean>(false);

  const [previousWinners, setPreviousWinners] = useState<Winner[]>([]);
  const [previousCommunityCards, setPreviousCommunityCards] = useState<Card[]>([]);
  const [showPreviousWinners, setShowPreviousWinners] = useState<boolean>(false);

  const theme = useTheme();

  const fullScreenMd = useMediaQuery(theme.breakpoints.down("xs"));
  const [leaveConfirmDialogOpen, setLeaveConfirmDialogOpen] = useState<boolean>(false);
  const [gameName, setGameName] = useState<string>("");

  const [blindIncreaseMode, setBlindIncreaseMode] = useState<BlindIncreaseModes>(
    BlindIncreaseModes.ROUND
  );
  const [blindIncreaseRound, setBlindIncreaseRound] = useState<number>(0);
  const [blindIncreaseTime, setBlindIncreaseTime] = useState<number>(0);
  const [blindIncreaseMulti, setBlindIncreaseMulti] = useState<number>(0);

  const {
    myPlayerId,
    currentPlayerId,
    pots,
    setPots,
    setWinners,
    bet,
    setBet,
    winners,
    communityCards,
    setCommunityCards,
    chat,
    setChat,
    gameStarted,
    setGameStarted,
    allowedActions,
    seats,
    setSeats,
    numPlayers,
    setNumPlayers,
    countDown,
    isCountDown,
    gameStartCountDown,
    gameStartMinusAmount,
    minusAmount,
    showConfetti,
    presetRaising,
    setPresetRaising,
    setCurrentTableId,
    startCountdown,
    clearGameStartCountdown,
    clearCountdown,
  } = useGame();

  const handlePresetRaisingOption = (value: string) => {
    if (presetRaising == value) {
      setPresetRaising("");
    } else {
      if (currentPlayerId === myPlayer.id && allowedActions && canRaise(allowedActions)) {
        if (!socket) {
          return;
        }

        let _raiseAmount = 0;
        if (value == PRESET_RAISING_BUTTON[0]) {
          _raiseAmount = Math.min(
            Math.max(Math.floor(pots[pots.length - 1].total / 2), allowedActions.params.minRaise),
            allowedActions.params.maxBet
          );
          // socket.emit("raise", tableId, _raiseAmount);
        } else if (value == PRESET_RAISING_BUTTON[1]) {
          _raiseAmount = Math.min(
            Math.max(Math.floor(pots[pots.length - 1].total), allowedActions.params.minRaise),
            allowedActions.params.maxBet
          );

          // socket.emit("raise", tableId, _raiseAmount);
        } else if (value == PRESET_RAISING_BUTTON[2]) {
          _raiseAmount = allowedActions.params.maxBet;
          // socket.emit("allIn", tableId);
        }
        setRaiseAmount(_raiseAmount);
        setPresetRaising(value);
      } else {
        setPresetRaising(value);
      }
    }
  };

  const handleLeaveConfirmDialogClose = () => {
    setLeaveConfirmDialogOpen(false);
  };

  const handleWinPrizeMenuOpen = () => {
    setWinPrizeMenuOpen(!infoMenuOpen);
  };

  const handleWinPrizeMenuClose = () => {
    setWinPrizeMenuOpen(false);
  };

  const handleInfoMenuOpen = () => {
    setInfoMenuOpen(!infoMenuOpen);
  };

  const handleInfoMenuClose = () => {
    setInfoMenuOpen(false);
  };

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      console.log(wallet.publicKey?.toBase58());
    }
  }, [wallet]);

  useEffect(() => {
    if (!tableId) return;
    if (!socket) return;
    setCurrentTableId(tableId);

    socket.on("gameBlindUpdated", (bigBlindAmount) => {
      setBigBlindBet(bigBlindAmount);
      setSmallBlindBet(bigBlindAmount / 2);
    });
    socket.emit(
      "viewTable",
      tableId,
      (
        seats,
        started,
        numPlayers,
        pots,
        winners,
        bet,
        bigBlindBet,
        smallBlindBet,
        communityCards,
        tableName,
        initStack,
        numSeats,
        buyIn,
        blindIncreaseMode,
        blindIncreaseRound,
        blindIncreaseTime,
        blindIncreaseMulti,
        countdownStartValue
      ) => {
        console.log("viewTable", {
          seats,
          started,
          numPlayers,
          pots,
          winners,
          bet,
          bigBlindBet,
          smallBlindBet,
          communityCards,
          tableName,
          initStack,
          numSeats,
          buyIn,
          blindIncreaseMode,
          blindIncreaseRound,
          blindIncreaseTime,
          blindIncreaseMulti,
        });

        if (started) {
          console.log(">>>>>>>>>>>>>>>>>>>>>>> countdown started at viewTable");
          startCountdown(countdownStartValue);
        }

        setSeats(seats);
        setGameStarted(started);
        setNumPlayers(numPlayers);
        setPots(pots);
        // setWinners(winners);
        setBet(bet);
        setBigBlindBet(bigBlindBet);
        setSmallBlindBet(smallBlindBet);
        setCommunityCards(communityCards);
        setChat([]);
        setGameName(tableName);

        setInitStack(initStack);
        setNumSeats(numSeats);
        setBuyIn(buyIn);

        setBlindIncreaseMode(blindIncreaseMode);
        setBlindIncreaseRound(blindIncreaseRound);
        setBlindIncreaseTime(blindIncreaseTime);
        setBlindIncreaseMulti(blindIncreaseMulti);
      }
    );
  }, [
    tableId,
    socket,
    setPots,
    setWinners,
    setBet,
    setCommunityCards,
    setChat,
    setGameStarted,
    setSeats,
    setNumPlayers,
  ]);

  const fetchPreviousWinners = () => {
    if (showPreviousWinners) {
      setShowPreviousWinners(false);
    } else {
      socket?.emit("getPreviousGameWinners", tableId, async (prevWinners, _prevCommunityCards) => {
        if (prevWinners) {
          setPreviousWinners(prevWinners);
          setShowPreviousWinners(true);
        } else {
          alert("No previous round");
        }
        if (_prevCommunityCards) {
          setPreviousCommunityCards(_prevCommunityCards);
        }
      });
    }
  };

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

  const handleStartGame = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!socket) return;
    socket.emit("startGame", tableId);
  };

  const handleCall = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("allowedActions >> ", allowedActions);
    if (allowedActions && allowedActions.params.maxBet == allowedActions.params.callAmount) {
      //!canRaise(allowedActions)
      if (!socket) return;
      socket.emit("allIn", tableId);
    } else if (allowedActions && allowedActions.params.maxBet > allowedActions.params.callAmount) {
      if (!socket) return;
      socket.emit("call", tableId);
    }
  };

  const handleRaise = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!socket) return;
    setShowSlider(false);
    socket.emit("raise", tableId, raiseAmount);
  };

  const handleCheck = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!socket) return;
    socket.emit("check", tableId);
  };

  const handleLeave = () => {
    if (isCountDown) {
      console.log("sending request...");
      if (!socket) return;
      // currentPlayerId === myPlayer.id &&
      if (gameStarted) {
        // let leaveAgree = confirm("Game Started. You will lose your funds. Do you agree?")
        setLeaveConfirmDialogOpen(true);
        // if (leaveAgree) {
        //   console.log("sending request with socket...", tableId)
        //   socket.emit("leave", tableId);
        //   console.log("sent request with socket.")
        //   router.push(`/`);
        // }
      } else {
        // let leaveAgree = confirm("Do you really want to leave this game?")
        setLeaveConfirmDialogOpen(true);
        // if (leaveAgree) {
        //   console.log("sending request with socket...", tableId)
        //   socket.emit("leave", tableId);
        //   console.log("sent request with socket.")
        //   router.push(`/`);
        // }
      }
    } else {
      router.push("/");
    }
  };

  const leaveProcess = () => {
    if (!socket) {
      errorAlert("Server Not Connected");
      return;
    }
    setLeaveConfirmDialogOpen(false);

    console.log("sending request with socket...", tableId);
    socket.emit("leave", tableId);
    clearCountdown();
    clearGameStartCountdown();

    console.log("sent request with socket.");
    router.push(`/`);
  };

  const handleFold = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!socket) return;
    socket.emit("fold", tableId);
  };

  const handleAllIn = (_event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!socket) return;
    socket.emit("allIn", tableId);
  };

  const getStreet = (communityCards: Card[]): Street => {
    switch (communityCards.length) {
      case 0:
        return Street.PREFLOP;
      case 3:
        return Street.FLOP;
      case 4:
        return Street.TURN;
      case 5:
        return Street.RIVER;
    }
    throw new Error(`No street with ${communityCards.length} cards`);
  };

  const myPlayer =
    seats && myPlayerId
      ? Object.values(seats).find((player) => player && player.id === myPlayerId)
      : null;

  const street = getStreet(communityCards);

  return (
    <div className={styles.page}>
      {showConfetti && <Confetti />}
      <span className={styles.walletBtn}></span>
      {/* <span className={styles.countdownLabel}>
        {
          isCountDown && gameStarted &&
          countDown
          // AUTO_START_TIME - minusAmount

        }
        {
          isCountDown && !gameStarted &&
          gameStartCountDown
          // AUTO_FOLD_TIME - gameStartMinusAmount
        }
      </span> */}
      {/* <div className={styles.tableBanner}>
         {smalBlindBet}/{bigBlindBet}
      </div> */}
      <div className={styles.tableContainer}>
        <div className={styles.table}>
          {/* {<div className={styles.street}>
            
            {buyIn / LAMPORTS_PER_SOL} SOL&nbsp;
            {gameName}
          </div>} */}

          {gameStarted && !winners && pots && (
            <div className={styles.potsContainer}>
              {pots.map((p, i) => {
                if (p.total > 0)
                  return (
                    <div className={styles.pot} key={`pot-${i}`}>
                      <div>{p.total}</div>
                    </div>
                  );
              })}
            </div>
          )}
          {gameStarted &&
            (showPreviousWinners ? (
              <CommunityCards cards={previousCommunityCards} />
            ) : (
              <CommunityCards cards={communityCards} />
            ))}
        </div>
        <>
          {/* {
            console.log(">>>>>>>>>>>>>>>>>", seats, ">>>><<<<<", Object.entries(seats), "<<<<<<<<<<<<<<<<<<<")
          } */}
        </>
        {seats &&
          Object.entries(seats).map(
            // [
            //   ["1",
            //     {
            //       address: "DjMMsvj4ZUBpAXCaR2Z7XuqzWFMegpb86iEKBfj1HrH8",
            //       bet: 25,
            //       cards: [],
            //       dealer: true,
            //       folded: false,
            //       id: "4bded392-9cc3-40a7-a521-f484a9f3d2fe",
            //       lastAction: null,
            //       name: "second2",
            //       pfp: "/img/avatars/1.png",
            //       stack: 975,
            //     }
            //   ]
            // ].map(
            ([seatId, player], i) =>
              (!gameStarted || player) && (
                <Seat
                  showPreviousWinners={showPreviousWinners}
                  previousWinners={previousWinners}
                  tableId={tableId}
                  // eslint-disable-next-line prettier/prettier
                  seatId={(seatId as unknown) as number}
                  player={player}
                  key={`seat-${i}`}
                />
              )
          )}
      </div>

      {/* {!gameStarted && numPlayers > 1 && (
        <button className={styles.startGame} onClick={handleStartGame}>
          START GAME
        </button>
      )} */}
      <>
        {/* {
          console.log(myPlayer, " >> my player")
        }
        {
          console.log(myPlayerId, ">> my player id")
        }
        {
          console.log(currentPlayerId, ">> current player id")
        }
        {
          console.log(numPlayers, " >> num players")
        } */}
      </>

      <div className={styles.buttonGroup}>
        {!showPreviousWinners &&
          gameStarted &&
          myPlayer &&
          currentPlayerId === myPlayer.id &&
          allowedActions &&
          showSlider && (
            <div className={styles.presetRaisingBtnContainer}>
              <button
                className={`${styles.actionBtn2} ${
                  presetRaising == PRESET_RAISING_BUTTON[0] && styles.bgColorGreen1
                }`}
                onClick={() => handlePresetRaisingOption(PRESET_RAISING_BUTTON[0])}
              >
                {PRESET_RAISING_BUTTON[0]}
              </button>
              <button
                className={`${styles.actionBtn2}  ${
                  presetRaising == PRESET_RAISING_BUTTON[1] && styles.bgColorGreen1
                }`}
                onClick={() => handlePresetRaisingOption(PRESET_RAISING_BUTTON[1])}
              >
                {PRESET_RAISING_BUTTON[1]}
              </button>
              <button
                className={`${styles.actionBtn2}  ${
                  presetRaising == PRESET_RAISING_BUTTON[2] && styles.bgColorGreen1
                }`}
                onClick={() => handlePresetRaisingOption(PRESET_RAISING_BUTTON[2])}
              >
                {PRESET_RAISING_BUTTON[2]}
              </button>
            </div>
          )}
        {!showPreviousWinners &&
          gameStarted &&
          myPlayer &&
          currentPlayerId === myPlayer.id &&
          allowedActions && (
            <>
              <div className={styles.actionButtonsContainer}>
                {showSlider ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="range"
                        min={allowedActions.params.minRaise}
                        max={allowedActions.params.maxBet}
                        value={raiseAmount}
                        onChange={(e) => {
                          setRaiseAmount(parseInt(e.target.value));
                          setPresetRaising("");
                        }}
                        className={styles.slider}
                      />
                    </div>
                    <button
                      className={`${styles.actionButton} ${styles.bgColorYellow1}`}
                      onClick={() => setShowSlider(false)}
                    >
                      Back
                    </button>
                    {raiseAmount === allowedActions.params.maxBet ? (
                      <button
                        className={`${styles.actionButton} ${styles.bgColorPink1}`}
                        onClick={handleAllIn}
                      >
                        All-in
                        <br />({raiseAmount})
                      </button>
                    ) : (
                      <button
                        className={`${styles.actionButton} ${styles.bgColorPink1}`}
                        onClick={handleRaise}
                      >
                        {bet === 0 ? "Bet" : "Raise"}
                        <br />({raiseAmount})
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {canCheck(allowedActions) && (
                      <button
                        className={`${styles.actionButton} ${styles.bgColorGreen1}`}
                        onClick={handleCheck}
                      >
                        Check
                      </button>
                    )}
                    {canCall(allowedActions) && (
                      <button
                        className={`${styles.actionButton} ${styles.bgColorGreen1}`}
                        onClick={handleCall}
                      >
                        Call
                        <br className={styles.mobileShow} />({allowedActions.params.callAmount})
                      </button>
                    )}
                    {canRaise(allowedActions) && (
                      <button
                        className={`${styles.actionButton} ${styles.bgColorYellow1}`}
                        onClick={() => {
                          setRaiseAmount(allowedActions.params.minRaise);
                          setShowSlider(true);
                        }}
                      >
                        {/* {bet === 0 ? "Bet" : "Raise"}  */}
                        Raise
                        <br className={styles.mobileShow} />({allowedActions.params.minRaise}-
                        {allowedActions.params.maxBet})
                      </button>
                    )}
                    {/* {canAllIn(allowedActions) && (
                  <button className={styles.actionButton} onClick={handleAllIn}>
                    All-in ({allowedActions.params.maxBet})
                  </button>
                )} */}

                    {canFold(allowedActions) && (
                      <button
                        className={`${styles.actionButton} ${styles.bgColorPink1}`}
                        onClick={handleFold}
                      >
                        Fold
                      </button>
                    )}
                  </>
                )}
              </div>
            </>
          )}
      </div>
      {chat.length > 0 && (
        <div className={styles.log}>
          {chat.map((msg, i) => {
            return (
              <span key={`chat-msg-${i}`}>
                {msg.ts.toLocaleTimeString()}: {msg.msg}
              </span>
            );
          })}
        </div>
      )}
      <div className={styles.logoWrapper} onClick={handleLeave}>
        <Image
          src={"/img/Logo.png"}
          alt="Logo"
          layout="fill"
          // width={"74px"}
          // height={"89px"}
          className={styles.logoImg}
        />
      </div>
      <div className={styles.rightTopMenu}>
        <div className={styles.menuContentWrapper}>
          <span className={styles.menuItem} onClick={fetchPreviousWinners}>
            <RefreshIcon />
          </span>

          <ClickAwayListener
            onClickAway={handleInfoMenuClose}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
          >
            <span className={styles.menuItem} onClick={() => handleInfoMenuOpen()}>
              i
              {infoMenuOpen && (
                <span className={styles.menuContent}>
                  <div className={styles.row}>
                    Blinds {smallBlindBet} / {bigBlindBet}
                  </div>
                  <div className={styles.row}>Buy-in: {buyIn / LAMPORTS_PER_SOL} SOL</div>
                  <div className={styles.row}>
                    Players: {numPlayers} /{numSeats}
                  </div>
                  <div className={styles.row}>Stack: {initStack}</div>
                </span>
              )}
            </span>
          </ClickAwayListener>

          <ClickAwayListener
            onClickAway={handleWinPrizeMenuClose}
            mouseEvent="onMouseDown"
            touchEvent="onTouchStart"
          >
            <span className={styles.menuItem} onClick={handleWinPrizeMenuOpen}>
              <WinCupIcon />
              {winPrizeMenuOpen && (
                <span className={styles.menuContent}>
                  <div className={`${styles.row} ${styles.menu2Col}`}>
                    <span>Rank</span>
                    <span>Prizes</span>
                  </div>
                  <div className={`${styles.row} ${styles.menu2Col}`}>
                    <span>1st</span>
                    <span>{(buyIn * numSeats) / LAMPORTS_PER_SOL}</span>
                  </div>
                </span>
              )}
            </span>
          </ClickAwayListener>

          <span className={`${styles.menuItem} ${styles.bgColorPink1}`} onClick={handleLeave}>
            X
          </span>
        </div>

        <div className={styles.street}>
          {buyIn / LAMPORTS_PER_SOL} SOL&nbsp;
          {gameName}
        </div>

        <div className={styles.street2}>
          {smallBlindBet * 2} / {bigBlindBet * 2}&nbsp; in{" "}
          {blindIncreaseMode == BlindIncreaseModes.ROUND
            ? blindIncreaseRound + " Round"
            : blindIncreaseTime + " min"}
        </div>
      </div>

      <Dialog
        fullScreen={fullScreenMd}
        open={leaveConfirmDialogOpen}
        onClose={handleLeaveConfirmDialogClose}
        aria-labelledby="leave-confirm-dialog"
        sx={{
          "& .MuiPaper-root": {
            background: "black",
            color: "white",
            border: "3px solid #93FF9E",
            borderRadius: "10px",
            padding: "40px 20px",
          },
        }}
      >
        {/* <DialogTitle id="responsive-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle> */}
        <DialogContent>
          <p className={styles.dialogText}>Do you want to leave the table?</p>
          <p className={styles.dialogText}>you will not be able to enter this table again</p>
          <div className={styles.dCenter}>
            <button
              className={`${styles.dialogBtn} ${styles.bgColorGreen1}`}
              onClick={handleLeaveConfirmDialogClose}
            >
              Stay
            </button>
            <button className={`${styles.dialogBtn} ${styles.bgColorPink1}`} onClick={leaveProcess}>
              leave
            </button>
          </div>
        </DialogContent>

        {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Disagree
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions> */}
      </Dialog>
    </div>
  );
};

export default Table;
