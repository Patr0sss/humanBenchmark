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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const lineData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],

  datasets: [
    {
      label: "Levels Passed",
      data: [4, 7, 6, 5, 10, 2, 3],
      borderColor: "#783dcb",
      backgroundColor: "black",
    },
  ],
};

const chartOptions = {
  responsive: true,
};

export default function UserDashboardPage() {
  const [currentGame, setCurrentGame] = useState("Aim Trainer");
  const [chartData, setChartData] = useState(lineData);

  const getCurrentGame = (game: string) => {
    setCurrentGame(game);
  };

  useEffect(() => {
    setChartData(lineData);
  }, []);

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
          <div>{currentGame}</div>
        </motion.div>
      </div>
    </div>
  );
}
