import { FC } from "react";
// import styles from "../styles/CommunityCards.module.css";
import { Card } from "../types/Card";
import { getCloudinaryPokerCard } from "../utils/Cloudinary";
import Image from "next/image";

const styles = require("../styles/CommunityCards.modul.css");

interface CommunityCardProps {
  card: Card;
}

const CummunityCard: FC<CommunityCardProps> = ({ card }) => {
  if (!card) {
    return <div className={styles.cardPlaceholder} />;
  }
  return (
    <div className={styles.cardContainer}>
      <Image
        src={getCloudinaryPokerCard(card)}
        alt="community-card"
        layout="fill"
        // width={"100px"}
        // height={"140px"}
      />
    </div>
  );
};

export default CummunityCard;
