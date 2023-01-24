export interface TemplateTable {
  id: string;
  name: string;

  startedAt: Date | null;
  endedAt: Date | null;
  numSeats: number;
  initialStack: number;
  minBet: number;
  buyIn: number;
  blindIncreaseMode: BlindIncreaseModes;
  blindIncreaseTime: number;
  blindIncreaseRound: number;
  blindIncreaseMulti: number;
}

export enum BlindIncreaseModes {
  TIME = "TIME",
  ROUND = "ROUND",
}

export enum GameModes {
  TABLE = "Table",
  TOURNAMENT = "Tournament",
}
