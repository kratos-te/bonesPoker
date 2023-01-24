// import { Dayjs } from "dayjs";
import { AllowedActions } from "./AllowedActions";
import { Card } from "./Card";
import { ActiveGame, Game } from "./Game";
import { PlayerRank } from "./Player";
import { Pot } from "./Pot";
import { Seats } from "./Seats";
import { BlindIncreaseModes, TemplateTable } from "./TemplateTable";
import { TemplateTournament } from "./TemplateTournament";
import { Tournament } from "./TournamentTable";
import { UserProfile } from "./UserProfile";
import { Winner } from "./Winner";

export interface ServerToClientEvents {
  resitTournamentTable: (gameId: string) => void;
  seatsUpdated: (seats: Seats, numPlayers: number, allCanOnlyCheck: boolean) => void;
  turnChangedTo: (playerId: string | null, allowedActions?: AllowedActions) => void;
  gameStarted: () => void;
  potsUpdated: (pots: Pot[]) => void;
  winners: (winners: Winner[] | null, finalFlag: boolean) => void;
  betUpdated: (bet: number) => void;
  communityCardsUpdated: (communityCards: Card[]) => void;
  log: (msg: string, ts: number) => void;
  holeCards: (cards: Card[]) => void;
  bestHand: (hand: string) => void;
  activeGameUpdated: (existingGames: ActiveGame[]) => void;
  gameBlindUpdated: (bigBlindAmount: number) => void;
  activeTournamentUpdated: (activeTournaments: Tournament[]) => void;
  afkGameUpdated: () => void;
}

export interface ClientToServerEvents {
  rejoinGameFromAfk: (
    wallet: string,
    gameId: string,
    callback: (myPlayerId: string | null) => void
  ) => Promise<void>;

  getAfkGames: (wallet: string, callback: (gameIds: ActiveGame[]) => void) => Promise<void>;

  getLeaderboardData: (
    callback: (dailyData: PlayerRank[], monthlyData: PlayerRank[]) => void
  ) => Promise<void>;
  sitTournament: (
    tournamentId: string,
    playerWallet: string,
    txId: string,
    callback: (playerId: string | null, gameId: string | null, gameStarted?: boolean) => void
  ) => Promise<void>;

  getPreviousGameWinners: (
    gameId: string,
    callback: (winners: Winner[] | null, prevCommunityCards: Card[] | null) => void
  ) => Promise<void>;

  getUserProfileData: (
    address: string,
    callback: (userData: UserProfile | null) => void
  ) => Promise<void>;

  saveUserProfileData: (
    address: string,
    userName: string,
    userPfp: string,
    callback: (result: boolean) => void
  ) => Promise<void>;

  getExistingTournaments: (callback: (activeTournamentList: Tournament[]) => void) => Promise<void>;

  getExistingGames: (callback: (activeGamelist: ActiveGame[]) => void) => Promise<void>;
  createGame: (tableId: string, callback: (gameId: string | null) => void) => Promise<void>;

  sitOnGame: (
    gameId: string,
    txId: string,
    player: string,
    callback: (playerId: string | null, gameStarted?: boolean) => void
  ) => Promise<void>;
  isSitOnGame: (gameId: string, player: string, callback: (flag: boolean) => void) => Promise<void>;

  isSitOnTournament: (
    tournamentId: string,
    player: string,
    callback: (exist: boolean) => void
  ) => Promise<void>;

  viewTable: (
    gameId: string,
    callback: (
      seats: Seats,
      started: boolean,
      numPlayers: number,
      pots: Pot[],
      winners: Winner[] | null,
      bet: number,
      bigBlindBet: number,
      smallBlindBet: number,
      communityCards: Card[],
      tableName: string,
      initStack: number,
      numSeats: number,
      buyIn: number,
      blindIncreaseMode: BlindIncreaseModes,
      blindIncreaseRound: number,
      blindIncreaseTime: number,
      blindIncreaseMulti: number,
      countdownStartValue: number
    ) => void
  ) => Promise<void>;
  startGame: (gameId: string) => Promise<void>;
  call: (gameId: string) => Promise<void>;
  raise: (gameId: string, amount: number) => Promise<void>;
  check: (gameId: string) => Promise<void>;
  fold: (gameId: string) => Promise<void>;
  allIn: (gameId: string) => Promise<void>;
  leave: (gameId: string) => Promise<void>;
  listTables: (callback: (tables: TemplateTable[]) => void) => Promise<void>;
  isTableExist: (
    editNumSeats: number,
    editMinBet: number,
    editInitialStack: number,
    editBuyIn: number,
    callback: (isExist: boolean) => void
  ) => Promise<void>;

  addNewTable: (
    editName: string,
    editNumSeats: number,
    editMinBet: number,
    editInitialStack: number,
    editBuyIn: number,
    blindIncreaseMode: string,
    blindIncreaseRound: number,
    blindIncreaseTime: number,
    callback: (tables: TemplateTable[]) => void
  ) => Promise<void>;

  addNewTournament: (
    editName: string,
    editTournamentNumSeats: number,
    editNumSeats: number,
    editMinBet: number,
    editInitialStack: number,
    editBuyIn: number,
    blindIncreaseMode: string,
    blindIncreaseRound: number,
    blindIncreaseTime: number,
    editTournamentEnterAt: Date,
    editTournamentStartAt: Date,
    callback: (tournaments: Tournament[]) => void
  ) => Promise<void>;

  deleteTable: (
    id: string,
    name: string,
    numSeats: number,
    minBet: number,
    editInitialStack: number,
    buyIn: number,
    callback: (tables: TemplateTable[]) => void
  ) => Promise<void>;

  deleteTournament: (
    id: string,
    name: string,
    numSeats: number,
    minBet: number,
    editInitialStack: number,
    buyIn: number,
    callback: (tables: TemplateTable[]) => void
  ) => Promise<void>;
}
