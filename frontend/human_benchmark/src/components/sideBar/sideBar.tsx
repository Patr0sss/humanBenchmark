import Duck from "../../assets/duck";
import Monkey from "../../assets/monkey";
import Ufo from "../../assets/ufo";
import WaterLily from "../../assets/waterLily";
import styles from "./sideBar.module.css";
// const GAMES = ["AIM Trainer", "Memory", "Sequence"];
// const GAMES = ["AIM", "Mem", "Seq"];
const GAMES = [
  { title: "Aim Trainer", icon: <Ufo width={45} />, linkURL: "tests/aim" },
  {
    title: "Sequence Memory",
    icon: <Duck width={45} />,
    linkURL: "tests/sequence",
  },
  {
    title: "Card Memory",
    icon: <WaterLily width={45} />,
    linkURL: "tests/memory",
  },
  {
    title: "SpeedTyping",
    icon: <Monkey width={45} />,
    linkURL: "/tests/typing",
  },
  {
    title: "Clicker Game",
    icon: <Monkey width={45} />,
    linkURL: "/tests/clicker",
  },
];

export default function SideBar() {
  return (
    <div>
      <div className={styles.sideBar}>
        {GAMES.map((game) => (
          <GameBar gameIcon={game.icon} gameTitle={game.title} />
        ))}
      </div>
    </div>
  );
}

const GameBar = ({
  gameTitle,
  gameIcon,
}: {
  gameTitle: string;
  gameIcon: React.ReactNode;
}) => {
  return (
    <div className={styles.gameBar}>
      <div className={styles.gameBarIcon}>{gameIcon}</div>
      <div className={styles.gameBarTitle}>{gameTitle}</div>
    </div>
  );
};
