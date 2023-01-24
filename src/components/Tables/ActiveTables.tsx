import React from "react";
import { useEffect, useState } from "react";

import { FC } from "react";
import { ActiveGame } from "../../types/Game";
// import styles from "./ActiveTables.module.css";
import { useSocket } from "../../context/SocketProvider";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { GameModes, TemplateTable } from "../../types/TemplateTable";
import { useGame } from "../../context/GameProvider";
import { useRouter } from "next/router";
import { errorAlert } from "../toastGroup";
import { enterTableOnChain } from "../../context/scripts";
import WaitingDialog from "../Dialog/WaitingDialog";
import { useWallet } from "@solana/wallet-adapter-react";

const styles = require("./ActiveTables.module.css");

interface ActiveTablesProps {
  buyInFilter?: number;
  setLoading: Function;
  loading: boolean;
  afkGamelist?: ActiveGame[];
}
const ActiveTables: FC<ActiveTablesProps> = ({ buyInFilter, setLoading, loading, afkGamelist }) => {
  // const [gamelist, setGamelist] = useState<ActiveGame[]>([]);
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
      errorAlert("Currently joining a game");
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
                setCurrentGameMode(GameModes.TABLE);
                setMyPlayerId(playerId);
                console.log("my player ID is ", playerId);
                setChat([]);
                setLoading(false);
                setSelectedGameId("");
                router.push(`/table/${gameId}`);

                setIsCountDown(true);
                if (gameStartedTmp) {
                  // setGameStarted(true);
                  startCountdown();
                } else {
                  startGameStartCountdown();
                }
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

  const handleRejoinGame = async (gameId: string) => {
    if (loading) {
      errorAlert("Currently joining a game");
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
    console.log(wallet.publicKey.toBase58(), gameId, ":::::::::::::::::");
    socket.emit("rejoinGameFromAfk", wallet.publicKey.toBase58(), gameId, async (_myPlayerId) => {
      if (_myPlayerId) {
        setMyPlayerId(_myPlayerId);
        setLoading(false);
        setSelectedGameId("");
        router.push(`/table/${gameId}`);

        return;
      } else {
        setLoading(false);
        setSelectedGameId("");
        errorAlert("Rejoining failed. Plz try again");
      }
    });
  };

  // useEffect(() => {
  //     if (!socket) return;
  //     socket.emit("getExistingGames", (activeGameList: ActiveGame[]) => {

  //         if (activeGameList && activeGameList.length > 0) setGamelist(activeGameList);
  //     })

  //     socket.on("activeGameUpdated", (existingGames) => {
  //         if (existingGames && existingGames.length > 0) setGamelist(existingGames);
  //     });
  // }, [socket]);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>

            <th>Amount</th>
            <th>Token</th>
            <th>Stack</th>
            <th>blinds</th>
            <th>player</th>
            <th style={{ width: "260px" }}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {afkGamelist == undefined &&
            gamelist
              .filter((game) => {
                if (buyInFilter && buyInFilter > 0) return game.buyIn == buyInFilter;
                else return true;
              })
              .map((game, i) => {
                if (Number(game.count) != game.numSeats)
                  return (
                    <tr key={`table-${game.gameId}`}>
                      <td>
                        {game.buyIn / LAMPORTS_PER_SOL} SOL &nbsp;
                        {game.name}
                      </td>
                      <td>{game.buyIn / LAMPORTS_PER_SOL}</td>
                      <td>SOL</td>
                      <td>{game.initialStack}</td>
                      <td>
                        {game.minBet / 2} /{game.minBet}
                      </td>
                      <td>
                        {game.count} /{game.numSeats}
                      </td>
                      <td>
                        {selectedGameId == game.gameId && loading ? (
                          <button className={styles.loadingBtn}>
                            joining table
                            <div className="lds-ellipsis">
                              <div></div>
                              <div></div>
                              <div></div>
                              <div></div>
                            </div>
                          </button>
                        ) : (
                          <button
                            className={styles.joinBtn}
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
                          </button>
                        )}
                      </td>
                    </tr>
                  );
              })}

          {afkGamelist &&
            afkGamelist.map((afkGame, index) => {
              return (
                <tr key={`afk-table-${afkGame.gameId}`}>
                  <td>
                    {afkGame.buyIn / LAMPORTS_PER_SOL} SOL &nbsp;
                    {afkGame.name}
                  </td>
                  <td>{afkGame.buyIn / LAMPORTS_PER_SOL}</td>
                  <td>SOL</td>
                  <td>{afkGame.initialStack}</td>
                  <td>
                    {afkGame.minBet / 2} /{afkGame.minBet}
                  </td>
                  <td>
                    {afkGame.count} /{afkGame.numSeats}
                  </td>
                  <td>
                    {selectedGameId == afkGame.gameId && loading ? (
                      <button className={styles.loadingBtn}>
                        rejoining table
                        <div className="lds-ellipsis">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </button>
                    ) : (
                      <button
                        className={styles.joinBtn}
                        onClick={() => handleRejoinGame(afkGame.id)}
                      >
                        rejoin
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveTables;
