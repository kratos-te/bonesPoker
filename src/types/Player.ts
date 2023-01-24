import { Action } from "./Action";

export interface Player {
  id: string;
  cards: string[];
  address: string;
  name: string;
  pfp: string;
  stack: number;
  bet: number;
  dealer: boolean;
  smallBlind: boolean;
  bigBlind: boolean;
  lastAction: Action | null;
  folded: boolean;
}

export interface PlayerRank {
  address: string;
  name: string;
  pfp: string;
  reward: number;
  rewardToken: string;
  gamesWon: number;
  totalGames: number;
}
