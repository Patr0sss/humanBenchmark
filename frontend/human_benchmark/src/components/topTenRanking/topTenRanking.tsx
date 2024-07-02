/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import styles from "./topTenRanking.module.css";
import { useEffect, useState } from "react";

// interface ScoreData {
//   _id: string;
//   scoreName: string;
//   _userId: string;
// }

export default function TopTenRanking({
  currentGame,
}: {
  currentGame: string;
}) {
  const token = sessionStorage.getItem("token");

  const [bestScoresForEachGame, setBestScoresForEachGame] = useState<{
    [key: string]: any;
  }>({
    "aim-trainer": [],
    "sequence-memory": [],
    "memory-game": [],
    typing: [],
    clicker: [],
    tzwctr: [],
  });

  const convertGameNamesFrontendToBackend = {
    "Aim-Trainer": "aim-trainer",
    Sequence: "sequence-memory",
    Memory: "memory-game",
    Typing: "typing",
    Clicker: "clicker",
    "TZWCTR(CH)": "tzwctr",
  } as { [key: string]: string };

  const scoreNameFrontendToBackend = {
    "Aim-Trainer": "average_time",
    Sequence: "score",
    Memory: "score",
    Typing: "time",
    Clicker: "clicks_per_second",
    "TZWCTR(CH)": "time",
  } as { [key: string]: string };
  const getTopTenScoresOfCurrentGame = async (
    gameNameBackend: string
    // scoreName: string
  ) => {
    if (token) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/top-ten/${gameNameBackend}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: JSON.parse(token),
            },
            withCredentials: true,
          }
        );
        // const rankingScores: ScoreData[] = res.data.data.map(
        //   (score: ScoreData) => score[scoreName as keyof ScoreData]
        // );

        setBestScoresForEachGame((prevScores) => ({
          ...prevScores,
          [gameNameBackend]: res.data.data,
        }));
        // setBestScoresForEachGame((prevScores) => ({
        //   ...prevScores,
        //   [gameNameBackend]: rankingScores,
        // }));
        console.log(gameNameBackend);
        console.log(res.data);
        console.log("---------------------------------");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getTopTenScoresOfCurrentGame("aim-trainer");
    getTopTenScoresOfCurrentGame("memory-game");
    getTopTenScoresOfCurrentGame("sequence-memory");
    // getTopTenScoresOfCurrentGame("typing");
    getTopTenScoresOfCurrentGame("clicker");
    getTopTenScoresOfCurrentGame("tzwctr");
  }, []);

  useEffect(() => {
    console.log(bestScoresForEachGame);
  }, [bestScoresForEachGame]);
  return (
    <div className={styles.topTenRanking}>
      TOP TEN RANKING in {currentGame}
      {bestScoresForEachGame[
        convertGameNamesFrontendToBackend[currentGame]
      ].map((score: { [x: string]: string }, index: number) => (
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <div> {index + 1}</div>
          <div key={index}>
            {score[scoreNameFrontendToBackend[currentGame]]}
          </div>
          <div>{score.username ? score.username : "user unknown"}</div>
        </div>
      ))}
    </div>
  );
}
