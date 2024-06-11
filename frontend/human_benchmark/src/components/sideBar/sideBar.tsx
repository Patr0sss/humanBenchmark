import { useState } from "react";
import Duck from "../../assets/duck";
import Ufo from "../../assets/ufo";
import WaterLily from "../../assets/waterLily";
import styles from "./sideBar.module.css";
import { motion } from "framer-motion";
import { opacityFadeVariants2 } from "../../assets/animationVariants";
import Treasure from "../../assets/treasure";
import Clicker from "../../assets/clicker";
import Keyboard from "../../assets/keyboard";
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
    title: "Speed Typing",
    icon: <Keyboard width={45} />,
    linkURL: "/tests/typing",
  },
  {
    title: "Clicker Game",
    icon: <Clicker width={45} />,
    linkURL: "/tests/clicker",
  },
  {
    title: "TZWCTR(CH)",
    icon: <Treasure width={45} />,
    linkURL: "tests/find",
  },
];

export default function SideBar({
  setGameCallback,
}: {
  setGameCallback: (game: string) => void;
}) {
  const [currentGame, setCurrentGame] = useState("Aim Trainer");

  const handleGameBarClick = (game: string) => {
    setCurrentGame(game);
    setGameCallback(game);
  };
  return (
    <div>
      <motion.div
        variants={opacityFadeVariants2}
        initial="hidden"
        animate="visible"
        className={styles.sideBar}
      >
        {GAMES.map((game) => (
          <div
            onClick={() => handleGameBarClick(game.title)}
            style={{
              backgroundColor: currentGame === game.title ? "lightgray" : "",
            }}
            className={styles.gameContainer}
          >
            <GameBar gameIcon={game.icon} gameTitle={game.title} />
          </div>
        ))}
      </motion.div>
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
