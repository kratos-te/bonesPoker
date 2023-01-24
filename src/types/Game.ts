import { Street } from "./Street";
import { Card } from "./Card";
import { Winner } from "./Winner";
import { Pot } from "./Pot";
import { BlindIncreaseModes } from "./TemplateTable";

export interface Game {
  id: string;
  tableId: string;
  currentPlayerId: string | null;
  createdAt: Date;
  updatedAt: Date;
  endedAt: Date | null;
  bet: number;
  communityCards: Card[];
  street: Street;
  hand: number;
  numSeats: number;
  minBet: number;
  initialStack: number;
  startedAt: Date | null;
  dealer: string | null;
  winners: Winner[] | null;
  pots: Pot[];
  blindIncreaseMode: BlindIncreaseModes;
  blindIncreaseTime: number;
  blindIncreaseRound: number;
  blindIncreaseMulti: number;
}

export interface ActiveGame {
  id: string;
  tableId: string;
  gameId: string;
  name: string;
  count: number;
  numSeats: number;
  buyIn: number;
  minBet: number;
  initialStack: number;
  blindIncreaseMode: BlindIncreaseModes;
  blindIncreaseTime: number;
  blindIncreaseRound: number;
  blindIncreaseMulti: number;
}
