import { BlindIncreaseModes } from "./TemplateTable";

export interface TemplateTournament {
  id: string;
  name: string;
  startedAt: Date | null;
  enterAt: Date | null;
  endedAt: Date | null;
  maxSeats: number;
  tableSeats: number;
  initialStack: number;
  minBet: number;
  buyIn: number;
  blindIncreaseMode: BlindIncreaseModes;
  blindIncreaseTime: number;
  blindIncreaseRound: number;
  blindIncreaseMulti: number;
}
