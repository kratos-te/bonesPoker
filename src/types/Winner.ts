import { Card } from "./Card";

export interface Winner {
  playerId: string;
  desc: string;
  prize: number;
  cards: Card[];
}
