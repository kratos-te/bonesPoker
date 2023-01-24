import { BlindIncreaseModes } from "./TemplateTable";

export interface Tournament {
  id: string;
  name: string;
  totalSeats: number;
  tableSeats: number;
  initialStack: number;
  minBet: number;
  buyIn: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  enterAt: Date | null;
  startAt: Date | null;
  endAt: Date | null;
  blindIncreaseMode: BlindIncreaseModes;
  blindIncreaseTime: number;
  blindIncreaseRound: number;
  blindIncreaseMulti: number;
  status: boolean;
}
