import { Player } from "./Player";
export interface Seats {
  [seatId: number]: Player | null;
}
