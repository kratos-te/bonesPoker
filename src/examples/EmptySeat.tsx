import { FC } from "react";
import { useGame } from "../context/GameProvider";
import { useSocket } from "../context/SocketProvider";
const styles = require("../styles/Seat.module.css");

interface EmptySeatProps {
  tableId: string;
  seatId: number;
  // position: {
  //   top: string;
  //   left: string;
  // };
}

const EmptySeat: FC<EmptySeatProps> = ({ tableId, seatId }) => {
  const { socket } = useSocket();
  const { setMyPlayerId } = useGame();

  return (
    <div
      // onClick={handleSit}
      className={styles.seat}
    >
      <div>SEAT {seatId}</div>
    </div>
  );
};

export default EmptySeat;
