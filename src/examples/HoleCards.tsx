import { FC } from "react";
import { Card, HIDDEN_CARDS } from "../types/Card";
import { getCloudinaryPokerCard } from "../utils/Cloudinary";
import Image from "next/image";
const styles = require("../styles/HoleCards.module.css");

interface HoleCardsProps {
  cards: Card[];
}

const HoleCards: FC<HoleCardsProps> = ({ cards }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className={styles.cardContainer}
        // style={{ rotate: "-8deg", transform: "translateX(3px)" }}
      >
        {cards[0] ? (
          <Image
            src={getCloudinaryPokerCard(cards[0])}
            alt="hole-card"
            layout="fill"
            className={styles.card}
            // width={"80px"}
            // height={"110px"}
          />
        ) : (
          <Image
            src={getCloudinaryPokerCard(HIDDEN_CARDS[0])}
            alt="hole-card"
            layout="fill"
            className={styles.card}
            // width={"80px"}
            // height={"110px"}
          />
        )}
      </div>
      <div
        className={styles.cardContainer}
        // style={{ rotate: "8deg", transform: "translateX(-3px)" }}
      >
        {cards[1] ? (
          <Image
            src={getCloudinaryPokerCard(cards[1])}
            alt="hole-card"
            layout="fill"
            className={styles.card}
            // width={"80px"}
            // height={"110px"}
          />
        ) : (
          <Image
            src={getCloudinaryPokerCard(HIDDEN_CARDS[1])}
            alt="hole-card"
            layout="fill"
            className={styles.card}
            // width={"80px"}
            // height={"110px"}
          />
        )}
      </div>
    </div>
  );
};

export default HoleCards;
