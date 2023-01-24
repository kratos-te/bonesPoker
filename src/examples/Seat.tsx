import { FC, useMemo } from "react";
import { useGame } from "../context/GameProvider";
import { Player } from "../types/Player";
import EmptySeat from "./EmptySeat";
import OccupiedSeat from "./OccupiedSeat";
import HoleCards from "./HoleCards";
import { HIDDEN_CARDS } from "../types/Card";
import { Winner } from "../types/Winner";
import { Action } from "../types/Action";
const styles = require("../styles/Seat.module.css");

const RIGHT_SEAT_IDS = ["1", "7", "8", "9", "10"];
interface SeatProps {
  tableId: string;
  seatId: number;
  player: Player | null;
  showPreviousWinners: boolean;
  previousWinners: Winner[];
}

interface Position {
  top: string;
  left: string;
}

const SeatPosition: { [seatId: number]: Position } = {
  1: { top: "85%", left: "60%" },
  2: { top: "85%", left: "45%" },
  3: { top: "85%", left: "30%" },
  4: { top: "66%", left: "12%" },
  5: { top: "27%", left: "12%" },
  6: { top: "12%", left: "30%" },
  7: { top: "12%", left: "45%" },
  8: { top: "12%", left: "60%" },
  9: { top: "30%", left: "75%" },
  10: { top: "66%", left: "75%" },
};

const Seat: FC<SeatProps> = ({ tableId, seatId, player, showPreviousWinners, previousWinners }) => {
  const {
    currentPlayerId,
    winners,
    holeCards,
    myPlayerId,
    gameStarted,
    bestHand,
    winFlag,
    isCountDown,
    countDown,
    gameStartCountDown,
    allCanOnlyCheck,
    numPlayers,
  } = useGame();

  const previousWinnersMap = useMemo(() => {
    return showPreviousWinners && previousWinners
      ? previousWinners.reduce((acc: { [playerId: string]: Winner }, w) => {
          acc[w.playerId] = w;
          return acc;
        }, {})
      : {};
  }, [previousWinners]);

  const winnersMap = !winners
    ? {}
    : winners.reduce((acc: { [playerId: string]: Winner }, w) => {
        acc[w.playerId] = w;
        return acc;
      }, {});

  return (
    <div className={styles.container}>
      {!player ? (
        <EmptySeat tableId={tableId} seatId={seatId} />
      ) : !gameStarted ? (
        <OccupiedSeat
          playerId={player.id}
          address={player.address}
          name={player.name}
          pfp={player.pfp}
          seatId={seatId}
        />
      ) : !showPreviousWinners ? (
        <>
          {
            <div className={styles.seatWithCards}>
              {/* {player.lastAction && (
                  // && !winners
                  <div className={styles.lastAction}>
                    <div>
                      {player.lastAction}
                      {
                        (player.lastAction == Action.CALL || player.lastAction == Action.RAISE || player.lastAction == Action.ALL_IN) &&
                        <>
                          ( {
                            player.bet
                          } )
                        </>
                      }

                    </div>
                  </div>
                )} */}
              {
                player.id in winnersMap ? (
                  <div className={styles.winnerBanner}>
                    <div>
                      Winner
                      {winnersMap[player.id].desc && <>({winnersMap[player.id].desc})</>}
                    </div>
                  </div>
                ) : (
                  <>
                    {(player.lastAction ||
                      (player.id === currentPlayerId &&
                        (!player.lastAction || player.lastAction != Action.FOLD))) && (
                      <div className={styles.lastActionWrapper}>
                        {player.lastAction && (
                          <>
                            {
                              // && !winners
                              <div className={styles.lastActionItem}>
                                <div>
                                  {player.lastAction}
                                  {(player.lastAction == Action.CALL ||
                                    player.lastAction == Action.RAISE ||
                                    player.lastAction == Action.ALL_IN) && <>( {player.bet} )</>}
                                </div>
                              </div>
                            }
                          </>
                        )}
                        {player.id === currentPlayerId &&
                          (!player.lastAction || player.lastAction != Action.FOLD) && (
                            <div className={styles.lastActionItem}>
                              {
                                isCountDown && gameStarted && countDown
                                // AUTO_START_TIME - minusAmount
                              }
                              {
                                isCountDown && !gameStarted && gameStartCountDown
                                // AUTO_FOLD_TIME - gameStartMinusAmount
                              }
                            </div>
                          )}
                      </div>
                    )}
                  </>
                )
                //bestHand <div className={styles.bestHand}>
                //   {/* {bestHand} */}

                // </div>
              }

              {player.id === currentPlayerId ? (
                <>
                  {/* {
                player.id === myPlayerId &&
                myPlayerId
              } */}
                  {(!player.lastAction || player.lastAction != Action.FOLD) && (
                    <>
                      <div className={styles.currentPlayerCardsContainer}>
                        <HoleCards
                          cards={
                            player.id === myPlayerId
                              ? holeCards
                                ? holeCards
                                : HIDDEN_CARDS
                              : HIDDEN_CARDS
                          }
                        />
                      </div>
                      {/* {
                          !(player.id in winnersMap) &&
                          <div className={styles.bestHand}>
                            {
                              isCountDown && gameStarted &&
                              countDown
                              // AUTO_START_TIME - minusAmount
                            }
                            {
                              isCountDown && !gameStarted &&
                              gameStartCountDown
                              // AUTO_FOLD_TIME - gameStartMinusAmount
                            }
                          </div>
                        } */}
                    </>
                  )}
                </>
              ) : (
                <>
                  {(!player.lastAction || player.lastAction != Action.FOLD) && (
                    <div className={`${player.folded ? styles.folded : ""} ${styles.cardPosition}`}>
                      {/* {
                          (player.id === myPlayerId) && myPlayerId
                        } */}
                      {/* (winners && winners.length > 0) */}
                      <HoleCards
                        cards={
                          player.id === myPlayerId
                            ? holeCards
                            : winFlag
                            ? !player.folded
                              ? player.cards
                              : HIDDEN_CARDS
                            : HIDDEN_CARDS
                        }
                      />
                    </div>
                  )}
                </>
              )}

              <div
                className={`${styles.playingSeat} ${
                  RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat
                }`}
              >
                <div>
                  {player.name && player.name != "" ? (
                    player.name.length > 10 ? (
                      player.name.slice(0, 8) + "..."
                    ) : (
                      player.name
                    )
                  ) : (
                    <>{player.address.slice(0, 4) + "..." + player.address.slice(-4)}</>
                  )}
                </div>

                <div className={Object.entries(winnersMap).length > 0 ? styles.winnerStack : ""}>
                  {!allCanOnlyCheck && player.stack}
                </div>
                <img
                  src={player.pfp}
                  className={`${styles.pfp} ${
                    RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp
                  }`}
                />
                {(player.dealer || player.smallBlind || player.bigBlind) && (
                  <div
                    className={`${styles.dealMarkWrapper} ${
                      RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightDealMarkWrapper
                    }`}
                  >
                    {player.dealer && (
                      <span className={`${styles.dealMark} ${styles.bgColorPink}`}>D</span>
                    )}
                    {numPlayers > 2 && player.smallBlind && (
                      <span className={`${styles.dealMark} ${styles.bgColorYellow}`}>SB</span>
                    )}
                    {numPlayers > 2 && player.bigBlind && (
                      <span className={`${styles.dealMark} ${styles.bgColorGreen}`}>BB</span>
                    )}
                  </div>
                )}
              </div>
              <div className={styles.playerData}>
                {/* {player.dealer && (
              <div className={styles.stackContainer}>
                <div>D</div>
              </div>
            )} */}
                {/* <div className={styles.stackContainer}>
              <div>{player.stack}</div>
            </div> */}
                {/* {!winFlag && (
              <div className={styles.stackContainer}>
                <div>{player.bet}</div>
              </div>
            )} */}
              </div>
            </div>
          }
        </>
      ) : (
        <div className={styles.seatWithCards}>
          {player.id in previousWinnersMap ? (
            <>
              <div className={styles.winnerBanner}>
                <div>Winner ({previousWinnersMap[player.id].desc})</div>
              </div>
              <div className={`${styles.cardPosition}`}>
                <HoleCards cards={previousWinnersMap[player.id].cards} />
              </div>

              <div
                className={`${styles.playingSeat} ${
                  RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat
                }`}
              >
                {player.name && player.name != "" ? (
                  player.name.length > 10 ? (
                    player.name.slice(0, 8) + "..."
                  ) : (
                    player.name
                  )
                ) : (
                  <>{player.address.slice(0, 4) + "..." + player.address.slice(-4)}</>
                )}
                <img
                  src={player.pfp}
                  className={`${styles.pfp} ${
                    RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp
                  }`}
                />
              </div>
            </>
          ) : (
            <>
              <div className={`${styles.cardPosition}`}>
                <HoleCards cards={HIDDEN_CARDS} />
              </div>

              <div
                className={`${styles.playingSeat} ${
                  RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPlayingSeat
                }`}
              >
                {player.name && player.name != "" ? (
                  player.name.length > 10 ? (
                    player.name.slice(0, 8) + "..."
                  ) : (
                    player.name
                  )
                ) : (
                  <>{player.address.slice(0, 4) + "..." + player.address.slice(-4)}</>
                )}
                <img
                  src={player.pfp}
                  className={`${styles.pfp} ${
                    RIGHT_SEAT_IDS.includes(seatId.toString()) && styles.rightPfp
                  }`}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Seat;
