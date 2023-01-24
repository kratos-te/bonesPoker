import { FC } from "react";
import { Card } from "../types/Card";
import CommunityCard from "./CommunityCard";
const styles = require("../styles/CommunityCards.module.css");

interface CommunityCardsProps {
  cards: Card[];
}

const CummunityCards: FC<CommunityCardsProps> = ({ cards }) => {
  return (
    <div className={styles.cardsContainer}>
      <CommunityCard card={cards[0]} />
      <CommunityCard card={cards[1]} />
      <CommunityCard card={cards[2]} />
      <CommunityCard card={cards[3]} />
      <CommunityCard card={cards[4]} />
    </div>
  );
};

export default CummunityCards;
