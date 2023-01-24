import React from "react";
import { useEffect, useState } from "react";

import { FC } from "react";
import { ActiveGame } from "../../types/Game";
// import styles from "./ActiveTables.module.css";
import { useSocket } from "../../context/SocketProvider";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { BlindIncreaseModes, GameModes, TemplateTable } from "../../types/TemplateTable";
import { useGame } from "../../context/GameProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { errorAlert } from "../../components/toastGroup";
import { enterTableOnChain, enterTournamentOnChain } from "../../context/scripts";
import WaitingDialog from "../Dialog/WaitingDialog";
import { Tournament } from "../../types/TournamentTable";

const styles = require("./ActiveTables.module.css");

interface ActiveTournamentsProps {
  buyInFilter: number;
  setLoading: Function;
  loading: boolean;
}
const ActiveTournaments: FC<ActiveTournamentsProps> = ({ buyInFilter, setLoading, loading }) => {
  const {
    setMyPlayerId,
    setChat,
    startGameStartCountdown,
    startCountdown,
    setGameStarted,
    setIsCountDown,
    gameStartCountdownIntervalHandler,
    countdownInteralHandler,
    tournamentList,
    setShowConfetti,
    setCurrentGameMode,
  } = useGame();
  const [selectedGameId, setSelectedGameId] = useState<string>("");

  const wallet = useWallet();
  const { socket } = useSocket();
  const router = useRouter();

  const handleJoinGame = async (tournament: Tournament) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    if (loading) {
      errorAlert("Currently joining another tournament");
      return;
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    if (!wallet || !wallet.connected || !wallet.publicKey) {
      errorAlert("Plz connect wallet first");
      setLoading(false);
      setSelectedGameId("");
      return;
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>");

    if (!socket) {
      errorAlert("Socket disconnected, Plz check your network");
      setLoading(false);
      setSelectedGameId("");
      return;
    }
    console.log(">>>>>>>>>>>>>>>>>>>>>>");
    setSelectedGameId(tournament.id);
    setLoading(true);
    //     tournamentId: string,
    // playerWallet: string,
    // callback: (playerId: string | null, gameId: string | null, gameStarted?: boolean) => void
    console.log(tournament.id, wallet.publicKey.toBase58());
    socket.emit("isSitOnTournament", tournament.id, wallet.publicKey.toBase58(), async (exist) => {
      console.log(
        `player ${wallet.publicKey?.toBase58()} is trying to enter tournament ${tournament.id}...`
      );
      if (exist) {
        errorAlert("Player already exist on the tournament");
        setLoading(false);
        return;
      } else {
        if (!wallet || !wallet.connected || !wallet.publicKey) {
          errorAlert("Plz connect wallet first");
          setLoading(false);
          setSelectedGameId("");
          return;
        }
        let result = await enterTournamentOnChain(
          wallet,
          tournament.initialStack,
          tournament.buyIn,
          tournament.minBet,
          tournament.totalSeats
        );
        if (result.result == 0 && result.txId) {
          if (gameStartCountdownIntervalHandler) clearInterval(gameStartCountdownIntervalHandler);
          if (countdownInteralHandler) clearInterval(countdownInteralHandler);

          socket.emit(
            "sitTournament",
            tournament.id,
            wallet.publicKey.toBase58(),
            result.txId,
            async (playerId, gameId, _gameStarted) => {
              setShowConfetti(false);
              console.log(playerId, gameId, _gameStarted);

              if (playerId && gameId) {
                console.log(">> function entered");
                setMyPlayerId(playerId);
                console.log("my player ID is ", playerId);
                setChat([]);

                setSelectedGameId("");

                setIsCountDown(true);
                router.push(`/table/${gameId}`);
                setCurrentGameMode(GameModes.TOURNAMENT);

                if (_gameStarted) {
                  // setGameStarted(true);
                  startCountdown();
                } else {
                  startGameStartCountdown();
                }
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

            <th>Buy In</th>

            <th>Stack</th>
            <th>blinds</th>
            <th>seats</th>
            <th>enter time / start time</th>
            <th>blind increase</th>
            <th style={{ width: "260px" }}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {tournamentList
            .filter((tournamnet) => {
              if (buyInFilter > 0) return tournamnet.buyIn == buyInFilter;
              else return true;
            })
            .map((tournament, i) => {
              // if (Number(game.count) != game.numSeats)
              return (
                <tr key={`table-${tournament.id}`}>
                  <td>{tournament.name}</td>
                  <td>{tournament.buyIn / LAMPORTS_PER_SOL} SOL</td>
                  <td>{tournament.initialStack}</td>
                  <td>
                    {tournament.minBet / 2} /{tournament.minBet}
                  </td>
                  <td>
                    / {tournament.totalSeats}({tournament.tableSeats})
                  </td>
                  <td>
                    {tournament.enterAt && new Date(tournament.enterAt).toLocaleString()} <br /> /
                    {tournament.startAt && new Date(tournament.startAt).toLocaleString()}
                  </td>
                  <td>
                    By {tournament.blindIncreaseMode}
                    <br />
                    Every
                    {tournament.blindIncreaseMode == BlindIncreaseModes.ROUND
                      ? tournament.blindIncreaseRound
                      : tournament.blindIncreaseTime}
                    <br />* {tournament.blindIncreaseMulti}
                  </td>
                  <td>
                    {selectedGameId == tournament.id && loading ? (
                      <button className={styles.loadingBtn}>
                        joining tournament
                        <div className="lds-ellipsis">
                          <div></div>
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </button>
                    ) : (
                      <button className={styles.joinBtn} onClick={() => handleJoinGame(tournament)}>
                        join
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

export default ActiveTournaments;
