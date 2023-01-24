// import ClipLoader from "react-spinners/ClipLoader";
import { FC } from "react";
import { useGame } from "../../context/GameProvider";
import RankShowPanel from "./RankShowPanel";
// import styles from "./Leaderboard.module.css";

const styles = require("./Leaderboard.module.css");

const Leaderboard: FC = () => {
  const { dailyRankData, monthlyRankData } = useGame();
  return (
    <div className={styles.container}>
      <RankShowPanel title="Daily Ranking" rankData={dailyRankData} />
      <RankShowPanel title="Monthly Ranking" rankData={monthlyRankData} />
    </div>
  );
};

export default Leaderboard;
