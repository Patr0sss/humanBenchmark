import styles from "./userDashboardPage.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import SideBar from "../../components/sideBar/sideBar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { opacityFadeVariants3 } from "../../assets/animationVariants";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
};

interface GameData {
  _id: string;
  level: string | { [key: string]: string };
  score: number;
  timestamp: string;
  user_id: string;
}

export default function UserDashboardPage() {
  const [currentGame, setCurrentGame] = useState("Aim-Trainer");

  const createNumberArray = (length: number): number[] => {
    return Array.from({ length }, (_, i) => i + 1);
  };

  const [ScoresForEachGame, setScoresForEachGame] = useState<{
    [key: string]: number[];
  }>({
    "Aim-Trainer": [],
    Sequence: [],
    Memory: [],
    Typing: [],
    Clicker: [],
    "TZWCTR(CH)": [],
  });

  const [numberOfScoresForEachGame, setNumberOfScoresForEachGame] = useState<{
    [key: string]: number[];
  }>({
    "Aim-Trainer": [0],
    Sequence: [0],
    Memory: [0],
    Typing: [0],
    Clicker: [0],
    "TZWCTR(CH)": [0],
  });

  const token = sessionStorage.getItem("token");

  const getGraphsData = async (
    gameNameBackend: string,
    gameNameFrontend: string,
    scoreName: string
  ) => {
    if (token) {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/${gameNameBackend}`,

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: JSON.parse(token),
            },
            withCredentials: true,
          }
        );
        console.log(gameNameBackend);
        console.log(res.data);
        const scores: number[] = res.data.data.map(
          (item: GameData) => item[scoreName as keyof GameData]
        );

        console.log(gameNameFrontend + " : " + scores);

        setScoresForEachGame((prevScores) => ({
          ...prevScores,
          [gameNameFrontend]: scores,
        }));

        setNumberOfScoresForEachGame((prevNumOfScores) => ({
          ...prevNumOfScores,
          [gameNameFrontend]: createNumberArray(scores.length),
        }));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getGraphsData("memory-game", "Memory", "score");
    getGraphsData("clicker", "Clicker", "clicks");
    getGraphsData("tzwctr", "TZWCTR(CH)", "time");
    getGraphsData("sequence-memory", "Sequence", "score");
    getGraphsData("aim-trainer", "Aim-Trainer", "average_time");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lineData = {
    labels: numberOfScoresForEachGame[currentGame],

    datasets: [
      {
        label: "Your Scores ",
        data: ScoresForEachGame[currentGame],
        borderColor: "#783dcb",
        backgroundColor: "black",
      },
    ],
  };

  const [chartData, setChartData] = useState(lineData);

  useEffect(() => {
    const updatedLineData = {
      ...lineData,
      datasets: [
        {
          ...lineData.datasets[0],
          data: ScoresForEachGame[currentGame],
        },
      ],
    };
    setChartData(updatedLineData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGame, ScoresForEachGame]);

  const getCurrentGame = (game: string) => {
    setCurrentGame(game);
  };

  return (
    <div className={styles.dashboard}>
      <SideBar setGameCallback={getCurrentGame} />
      <div className={styles.dashboardRightSide}>
        <motion.div
          className={styles.graphSection}
          variants={opacityFadeVariants3}
          initial="hidden"
          animate="visible"
        >
          <Line options={chartOptions} data={chartData} />
          <div>
            {currentGame === "Aim-Trainer" ? "Aim Trainer" : currentGame}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
