import { useState } from "react";
import Timer from "../../assets/timer";
import styles from "./aimTrainer.module.css";

export default function AimTrainer() {
  const [targetX, setTargetX] = useState(50);
  const [targetY, setTargetY] = useState(50);

  const onTargetClick = () => {
    setTargetX(Math.floor(Math.random() * 80) + 10);
    setTargetY(Math.floor(Math.random() * 80) + 10);
  };

  return (
    <div className={styles.AimTrainer}>
      <div className={styles.gameContainer}>
        <div
          className={styles.aimTarget}
          style={{ left: `${targetX}%`, top: `${targetY}%` }}
          onClick={onTargetClick}
        >
          <Timer />
        </div>
      </div>
    </div>
  );
}
