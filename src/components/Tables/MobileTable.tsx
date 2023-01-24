import React, { useEffect, useState } from "react";

import { FC } from "react";
import { enterTableOnChain } from "../../context/scripts";
import { ActiveGame } from "../../types/Game";
import { errorAlert } from "../toastGroup";
import { useGame } from "../../context/GameProvider";
import { useRouter } from "next/router";
import { useSocket } from "../../context/SocketProvider";

// import styles from './MobileTable.module.css';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Image from "next/image";
import { GameModes } from "../../types/TemplateTable";
import { useWallet } from "@solana/wallet-adapter-react";
const styles = require("./MobileTable.module.css");

interface MobileTableProps {
  setLoading: Function;
  loading: boolean;
  showAll: boolean;
}

const MobileTable: FC<MobileTableProps> = ({ setLoading, loading, showAll }) => {
  const {
    setMyPlayerId,
    setChat,
    startGameStartCountdown,
    startCountdown,
    setGameStarted,
    setIsCountDown,
    gameStartCountdownIntervalHandler,
    countdownInteralHandler,
    gamelist,
    setShowConfetti,
    setCurrentGameMode,
  } = useGame();

  const [selectedGameId, setSelectedGameId] = useState<string>("");

  const wallet = useWallet();
  const { socket } = useSocket();
  const router = useRouter();

  const handleJoinGame = async (
    gameId: string,
    buyIn: number,
    initialStack: number,
    minBet: number,
    numSeat: number,
    count: number
  ) => {
    if (loading) {
      errorAlert("Currently joining a game.");
      return;
    }
    setSelectedGameId(gameId);
    setLoading(true);
    if (!wallet || !wallet.connected || !wallet.publicKey) {
      errorAlert("Plz connect wallet first");
      setLoading(false);
      setSelectedGameId("");
      return;
    }

    if (!socket) {
      errorAlert("Socket disconnected, Plz check your network");
      setLoading(false);
      setSelectedGameId("");
      return;
    }
    socket.emit("isSitOnGame", gameId, wallet.publicKey.toBase58(), async (resultFlag: boolean) => {
      console.log("player trying to sit...", gameId, wallet?.publicKey?.toBase58());
      if (resultFlag) {
        errorAlert("Already Entered The Game");
        setLoading(false);
        setSelectedGameId("");
        return;
      } else {
        if (!wallet || !wallet.publicKey) {
          errorAlert("Plz connect wallet first");
          setLoading(false);
          setSelectedGameId("");
          return;
        }
        let result = await enterTableOnChain(wallet, initialStack, buyIn, minBet, numSeat);
        console.log(result);
        if (result.result == 0 && result.txId) {
          if (gameStartCountdownIntervalHandler) clearInterval(gameStartCountdownIntervalHandler);
          if (countdownInteralHandler) clearInterval(countdownInteralHandler);
          socket.emit(
            "sitOnGame",
            gameId,
            result.txId,
            wallet.publicKey.toBase58(),
            (playerId: string | null, gameStartedTmp?: boolean) => {
              setShowConfetti(false);
              if (playerId) {
                setMyPlayerId(playerId);
                console.log("my player ID is ", playerId);
                setChat([]);
                setCurrentGameMode(GameModes.TABLE);
                router.push(`/table/${gameId}`);

                setIsCountDown(true);
                if (gameStartedTmp) {
                  // setGameStarted(true);
                  startCountdown();
                } else {
                  startGameStartCountdown();
                }
                setLoading(false);
                setSelectedGameId("");
                // if (count == numSeat - 1) {
                // } else {
                // }
              } else {
                setLoading(false);
                setSelectedGameId("");
                errorAlert("Join Table Failed!");
              }
            }
          );
        } else {
          setLoading(false);
          setSelectedGameId("");
          errorAlert("Join Table Failed!");
        }
      }
    });
  };

  return (
    <div className={styles.container}>
      {gamelist
        .slice(0, showAll ? gamelist.length : Math.min(5, gamelist.length))
        .map((game, i) => {
          if (Number(game.count) != game.numSeats)
            return (
              <div
                key={i}
                className={`${styles.tableContainer} ${
                  selectedGameId == game.gameId && loading && styles.borderYellow1
                }`}
              >
                <div className={styles.tableInfoContent}>
                  <div className={styles.avatarContainer}>
                    <img src={"/img/tableAvatar.png"} className={styles.tableAvatar} alt="table" />
                  </div>
                  <div className={styles.tableInfo}>
                    <p className={styles.tableTitle}>{game.name}</p>
                    <div className={styles.tableDetailInfoPanel}>
                      <span>
                        <span className={styles.iconWrapper} style={{ marginRight: 5 }}>
                          <Image src={"/img/bones-coin.png"} width={"25px"} height={"25px"} />
                        </span>
                        {game.initialStack}
                      </span>
                      <span>
                        <span className={styles.iconWrapper} style={{ marginRight: 5 }}>
                          <Image src={"/img/bones-coin.png"} width={"25px"} height={"25px"} />
                        </span>
                        {game.minBet / 2} /{game.minBet} Blinds
                      </span>
                      <span>
                        <span className={styles.iconWrapper} style={{ marginRight: 5 }}>
                          <Image src={"/img/solana-logo.png"} width={"25px"} height={"25px"} />
                        </span>
                        {game.buyIn / LAMPORTS_PER_SOL} SOL
                      </span>
                      <span>
                        <span className={styles.iconWrapper}>
                          <Image src={"/img/profile.png"} width={"25px"} height={"25px"} />
                        </span>
                        {game.count} /{game.numSeats}
                      </span>
                    </div>
                  </div>
                </div>
                {selectedGameId == game.gameId && loading ? (
                  <div className={`${styles.tableInfoFooter} ${styles.bgYellow1}`}>
                    joining table
                    <div className="lds-ellipsis">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.tableInfoFooter}
                    onClick={() =>
                      handleJoinGame(
                        game.gameId,
                        game.buyIn,
                        game.initialStack,
                        game.minBet,
                        game.numSeats,
                        game.count
                      )
                    }
                  >
                    join
                  </div>
                )}
              </div>
            );
        })}
    </div>
  );
};

export default MobileTable;
