import { FC } from "react";
// import styles from "./HeroSection.module.css";
import Carousel from "react-bootstrap/Carousel";

import Card from "@mui/material/Card";

const styles = require("./HeroSection.module.css");

export type TFeaturedPost = {
  imageUrl: string;
  name: string;
  description: string;
  link: string;
  btn: string;
};

export const FEATURED_POST: TFeaturedPost[] = [
  {
    imageUrl: "/img/banner1.png",
    name: "Welcome",
    description:
      "To your new favorite poker platform. Bones Poker brings a new level of poker to Solana blockchain.",
    btn: "+ Play",
    link: "/collection/asac.near/Antisocial Ape Club",
  },
  {
    imageUrl: "/img/banner1.png",
    name: "Welcome",
    description:
      "To your new favorite poker platform. Bones Poker brings a new level of poker to Solana blockchain.",
    link: "/collection/nearton_nft.near/NEARton",
    btn: "+ Play",
  },
  {
    imageUrl: "/img/banner1.png",
    name: "Welcome",
    description:
      "To your new favorite poker platform. Bones Poker brings a new level of poker to Solana blockchain.",
    link: "/collection/secretskelliessociety.near/Secret Skellies Society",
    btn: "+ Play",
  },
];

const HeroSection: FC<any> = () => {
  return (
    <div className={styles.container}>
      <Carousel controls={false}>
        {FEATURED_POST.map((post, i) => {
          return (
            <Carousel.Item key={i}>
              <div className={styles.carouselContent}>
                <div className={styles.textSection}>
                  <div className={styles.text}>
                    <p className={styles.title}>{post.name}</p>
                    <p className={styles.description}>{post.description}</p>
                  </div>
                  <button className={styles.btn}>{post.btn}</button>
                </div>
                <div className={styles.imgSection}>
                  <img src={post.imageUrl} className={styles.bannerImg} />
                </div>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HeroSection;
