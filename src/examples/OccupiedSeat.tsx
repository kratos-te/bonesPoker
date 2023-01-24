import { FC } from "react";
const styles = require("../styles/Seat.module.css");

interface OccupiedSeatProps {
  seatId: number;
  playerId: string;
  address: string;
  name: string;
  pfp: string;
}

const RIGHT_SEAT_IDS = ["1", "7", "8", "9", "10"];

const OccupiedSeat: FC<OccupiedSeatProps> = ({ playerId, address, name, pfp, seatId }) => {
  return (
    // <div
    //   className={styles.seat}
    //   style={{
    //     ...position,
    //   }}
    // >
    //   <div>
    //     {
    //       name && name != "" ?
    //         (name.length > 10 ? name.slice(0, 6) + "..." : name) :
    //         <>
    //           {
    //             address.slice(0, 6)
    //           }...
    //           <br />
    //           {
    //             address.slice(-6)
    //           }
    //         </>
    //     }

    //   </div>
    // </div>
    <div
      className={`${styles.playingSeat} ${
        RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat
      }`}
    >
      {name && name != "" ? (
        name.length > 10 ? (
          name.slice(0, 8) + "..."
        ) : (
          name
        )
      ) : (
        <>{address.slice(0, 4) + "..." + address.slice(-4)}</>
      )}

      <img
        src={pfp}
        className={`${styles.pfp} ${RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp}`}
      />
    </div>
  );
};

export default OccupiedSeat;
