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

// @mui material components
import { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";

// Material Dashboard 2 PRO React TS examples components
import DataTable from "examples/Tables/DataTable";

// Data
import dataTableActivegames from "../../data/dataTableActiveGames";
import { useRouter } from "next/router";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSocket } from "context/SocketProvider";
import { errorAlert } from "components/toastGroup";
import { ActiveGame } from "types/Game";
import { useGame } from "context/GameProvider";
import { TemplateTable } from "types/TemplateTable";
import { enterTableOnChain } from "context/scripts";
import ActiveTables from "components/Tables/ActiveTables";
import MobileTable from "components/Tables/MobileTable";
import Tables from "components/Tables/Tables";
import DATA_TABLE_ACTIVE_GAMES from "../../data/dataTableActiveGames";

interface ActiveGamesTemplate {
  activegames: string;
  amount: number;
  stack: number;
  blinds: number;
  token: number;
  player: number;
  status: string;
}
const ActiveGamesTable = () => {
  const {
    setMyPlayerId,
    setChat,
    startGameStartCountdown,
    startCountdown,
    setGameStarted,
    setIsCountDown,
    gameStartCountdownIntervalHandler,
    countdownInteralHandler,
  } = useGame();
  const wallet = useWallet();
  const { socket } = useSocket();
  const router = useRouter();
  const [tables, setTables] = useState<TemplateTable[]>([]);
  const [menu, setMenu] = useState("existing");
  const [gamelist, setGamelist] = useState<ActiveGamesTemplate[]>([]);
  const [buyInFilter, setBuyInFilter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const [dataTableActivegames, setDataTableActivegames] = useState([]);

  const handleCreateGame = (tableId: string) => {
    socket?.emit("createGame", tableId, (gameId) => {
      router.push(`/table/${gameId}`);
    });
  };

  const handleJoinGame = async (
    gameId: string,
    buyIn: number,
    initialStack: number,
    minBet: number,
    numSeat: number,
    count: number
  ) => {
    if (!wallet || !wallet.connected || !wallet.publicKey) {
      errorAlert("Plz connect wallet first");
      return;
    }

    if (!socket) {
      errorAlert("Socket disconnected, Plz check your network");
      return;
    }

    socket.emit("isSitOnGame", gameId, wallet.publicKey.toBase58(), async (resultFlag: boolean) => {
      console.log("player trying to sit...", gameId, wallet?.publicKey?.toBase58());
      if (resultFlag) {
        errorAlert("Already Entered The Game");
        return;
      } else {
        if (!wallet || !wallet.publicKey) {
          errorAlert("Plz connect wallet first");
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
              if (playerId) {
                setMyPlayerId(playerId);
                console.log("my player ID is ", playerId);
                setChat([]);
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
                errorAlert("Join Table Failed!");
              }
            }
          );
        } else {
          errorAlert("Join Table Failed!");
        }
      }
    });
  };

  useEffect(() => {
    if (!socket) return;
    socket.emit("getExistingGames", (activeGameList: ActiveGame[]) => {
      if (activeGameList && activeGameList.length > 0)
        setGamelist((activeGameList as unknown) as ActiveGamesTemplate[]);

      // setDataTableActivegames(tmp);
    });
    socket.emit("listTables", (tables: TemplateTable[]) => {
      setTables(tables);
    });

    socket.on("activeGameUpdated", (existingGames) => {
      if (existingGames && existingGames.length > 0)
        setGamelist((existingGames as unknown) as ActiveGamesTemplate[]);
    });
  }, [socket]);

  return (
    <MDBox my={3}>
      {/* <ActiveTables buyInFilter={buyInFilter} setLoading={setLoading} loading={loading} /> */}
      {/* <DataTable
        table={dataTableActivegames}
        entriesPerPage={false}
        buyInFilter={buyInFilter}
        setLoading={setLoading}
        loading={loading}
      /> */}
      <DataTable
        // table={dataTableActivegames}
        tableColumns={DATA_TABLE_ACTIVE_GAMES.columns}
        tableRows={gamelist}
        entriesPerPage={false}
        buyInFilter={buyInFilter}
        setLoading={setLoading}
        loading={loading}
      />
      {/* <MobileTable setLoading={setLoading} loading={loading} showAll={true} /> */}
    </MDBox>
  );
};

export default ActiveGamesTable;
