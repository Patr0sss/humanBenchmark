import styles from "./sideBar.module.css";
const GAMES = ["AIM trainer", "Memory", "Sequence"];
export default function SideBar() {
  return (
    <div className={styles.sideBar}>
      {GAMES.map((game) => (
        <GameBar gameTitle={game} />
      ))}
    </div>
  );
}

const GameBar = ({ gameTitle }: { gameTitle: string }) => {
  return <div className={styles.gameBar}>{gameTitle}</div>;
};
