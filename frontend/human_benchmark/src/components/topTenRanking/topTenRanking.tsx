import axios from "axios";
import styles from "./topTenRanking.module.css";
import { useEffect } from "react";

export default function TopTenRanking({
  currentGame,
}: {
  currentGame: string;
}) {
  const token = sessionStorage.getItem("token");

  const getTopTenScoresOfCurrentGame = async (gameNameBackend: string) => {
    if (token) {
      try {
        const res = await axios.get("http://127.0.0.1:5000/top-ten", {
          headers: {
            "Content-Type": "application/json",
            // Authorization: JSON.parse(token),
            // current_user: JSON.parse(token),
          },
          withCredentials: true,
          params: {
            name_of_game: gameNameBackend,
            // current_user: JSON.parse(token),
          },
        });

        console.log(res.data);
        console.log(gameNameBackend);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getTopTenScoresOfCurrentGame("clicker");
  }, []);
  return (
    <div className={styles.topTenRanking}>TOP TEN RANKING in {currentGame}</div>
  );
}
