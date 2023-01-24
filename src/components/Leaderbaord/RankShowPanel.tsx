import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Link from "next/link";
import { FC } from "react";
import { PlayerRank } from "../../types/Player";
import { getShortWalletString } from "../../utils/utils";
// import styles from "./RankShowPanel.module.css";

const styles = require("./RankShowPanel.module.css");
interface RankProps {
  rankData: PlayerRank[];
  title: string;
}
const RankShowPanel: FC<RankProps> = ({ rankData, title }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      <table>
        <thead>
          <tr className={styles.row}>
            <th>Rank</th>
            <th>Player name</th>
            <th>$SOL won</th>
            <th>games won</th>
            <th>win rate</th>
          </tr>
        </thead>
        <tbody>
          {rankData.map((row, index) => {
            return (
              <tr key={title + index} className={styles.row}>
                <td>
                  {index + 1}
                  {index + 1 == 1 ? "st" : index + 1 == 2 ? "nd" : index + 1 == 3 ? "rd" : "th"}
                </td>
                <td>
                  <Link href={`/detail/${row.address}`}>
                    <a className={styles.link}>
                      {row.name ? row.name : getShortWalletString(row.address, 4)}
                    </a>
                  </Link>
                </td>
                <td>{Math.floor((row.reward / LAMPORTS_PER_SOL) * 100) / 100} SOL</td>
                <td>{row.gamesWon}</td>
                <td>
                  {row.gamesWon > 0 ? Math.floor((row.gamesWon / row.totalGames) * 100) : 0} %
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RankShowPanel;
