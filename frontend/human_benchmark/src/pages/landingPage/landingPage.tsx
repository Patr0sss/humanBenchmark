import Duck from "../../assets/duck";
import Monkey from "../../assets/monkey";
import Ufo from "../../assets/ufo";
import WaterLily from "../../assets/waterLily";
import GameCard from "../../components/gameCard/gameCard";
import styles from "./landingPage.module.css";

const GAMES = [
  { title: "Aim Trainer", icon: <Ufo />, linkURL: "tests/aim" },
  { title: "Sequence", icon: <Duck />, linkURL: "tests/sequence" },
  { title: "Memory", icon: <WaterLily />, linkURL: "tests/memory" },
  { title: "Typing", icon: <Monkey />, linkURL: "/tests/typing" },
  { title: "Clicker", icon: <Monkey />, linkURL: "/tests/clicker" },
  { title: "placeholder", icon: <Monkey />, linkURL: "tests/find" },
  { title: "placeholder", icon: <Monkey />, linkURL: "/" },
];

export default function LandingPage() {
  return (
    <div className={styles.landingPage}>
      {GAMES.map((game) => (
        <GameCard
          gameIcon={game.icon}
          gameTitle={game.title}
          linkURL={game.linkURL}
        />
      ))}
    </div>
  );
}
