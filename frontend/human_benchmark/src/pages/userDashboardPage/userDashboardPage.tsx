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
      backgroundColor: "#783dcb",
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    // legend: {
    //   display: false,
    // },
  },
};

export default function UserDashboardPage() {
  return (
    <div className={styles.dashboard}>
      <SideBar />
      <div className={styles.dashboardRightSide}>
        <div className={styles.graphSection}>
          <Line options={chartOptions} data={lineData} />
          <div>Sequence Memory</div>
        </div>
      </div>
    </div>
  );
}
