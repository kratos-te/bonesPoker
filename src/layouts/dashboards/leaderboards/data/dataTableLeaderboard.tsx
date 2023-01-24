/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS components
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";

// ProductPage page components
import ProductCell from "../components/ProductCell";
import ReviewCell from "../components/ReviewCell";
import DefaultCell from "../components/DefaultCell";

const dataTableLeaderboard = {
  columns: [
    { Header: "rank", accessor: "rank", width: "10%" },
    { Header: "player", accessor: "player", width: "20%" },
    { Header: "sol won", accessor: "solwon", align: "center" },
    { Header: "games won", accessor: "gameswon", align: "center" },
    { Header: "win rate", accessor: "winrate", align: "center" },
    { Header: "level", accessor: "level", align: "center" },
  ],

  // rows: [
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/Nn4MtwG/11.png"} name="Karl" />,
  //     rank: <DefaultCell>1st</DefaultCell>,
  //     level: <ReviewCell rating={4.5} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={91} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>69 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>41</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/dmvh21r/2.png"} name="MAFADAF" />,
  //     rank: <DefaultCell>2nd</DefaultCell>,
  //     level: <ReviewCell rating={4} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={80} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>61 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>37</DefaultCell>,
  //   },
  //   {
  //     player: (
  //       <ProductCell image={"https://i.ibb.co/D1mTftM/Update-Can-1.png"} name="bobby18.sol" />
  //     ),
  //     rank: <DefaultCell>3rd</DefaultCell>,
  //     level: <ReviewCell rating={4} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={75} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>55 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>35</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/5Tt6Y44/carlos.png"} name="CarlosOMFGTV" />,
  //     rank: <DefaultCell>4th</DefaultCell>,
  //     level: <ReviewCell rating={4} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={70} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>50 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>33</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/LYFKDny/hangry.png"} name="Daddy" />,
  //     rank: <DefaultCell>5th</DefaultCell>,
  //     level: <ReviewCell rating={3.5} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={66} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>48 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>31</DefaultCell>,
  //   },
  //   {
  //     player: (
  //       <ProductCell
  //         image={
  //           "https://i.ibb.co/Dkq2HN8/p-Vbz3-Y7pp-E6q3j9-Nb-P8-Mwrblz-ZCm6-P64-Is-Qp36-Sk-YPI.png"
  //         }
  //         name="cryptonate97"
  //       />
  //     ),
  //     rank: <DefaultCell>6th</DefaultCell>,
  //     level: <ReviewCell rating={3.5} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={64} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>47 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>30</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/FhDKkmb/ghost2.png"} name="marsad" />,
  //     rank: <DefaultCell>7th</DefaultCell>,
  //     level: <ReviewCell rating={3} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={60} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>44 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>28</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/WGTk5xP/Update-Can.png"} name="cointilt" />,
  //     rank: <DefaultCell>8th</DefaultCell>,
  //     level: <ReviewCell rating={3} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={50} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>41 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>26</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/vmDH0TY/IMG-7097.jpg"} name="marsad" />,
  //     rank: <DefaultCell>9th</DefaultCell>,
  //     level: <ReviewCell rating={3} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={60} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>44 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>28</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/dmvh21r/2.png"} name="cointilt" />,
  //     rank: <DefaultCell>10th</DefaultCell>,
  //     level: <ReviewCell rating={3} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={50} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>41 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>26</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/dmvh21r/2.png"} name="marsad" />,
  //     rank: <DefaultCell>7th</DefaultCell>,
  //     level: <ReviewCell rating={3} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={60} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>44 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>28</DefaultCell>,
  //   },
  //   {
  //     player: <ProductCell image={"https://i.ibb.co/dmvh21r/2.png"} name="cointilt" />,
  //     rank: <DefaultCell>8th</DefaultCell>,
  //     level: <ReviewCell rating={3} />,
  //     winrate: (
  //       <MDBox width="8rem">
  //         <MDProgress variant="gradient" value={50} color="success" />
  //       </MDBox>
  //     ),
  //     solwon: <DefaultCell>41 $SOL</DefaultCell>,
  //     gameswon: <DefaultCell>26</DefaultCell>,
  //   },
  // ],
};

export default dataTableLeaderboard;
