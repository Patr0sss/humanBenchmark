import { useEffect, useState } from "react";
import Timer from "../../assets/timer";
import styles from "./aimTrainer.module.css";

export default function AimTrainer() {
  const MAX_CLICKS = 12;
  const [targetX, setTargetX] = useState(50);
  const [targetY, setTargetY] = useState(50);
  const [clicksLeft, setClicksLeft] = useState(MAX_CLICKS);
  const [missedClicks, setMissedClicks] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const onTargetClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    if (clicksLeft > 0) {
      if (clicksLeft === MAX_CLICKS && startTime === 0) {
        setStartTime(Date.now());
      }
      setTargetX(Math.floor(Math.random() * 80) + 10);
      setTargetY(Math.floor(Math.random() * 80) + 10);
      setClicksLeft((prev) => prev - 1);
    }
  };

  const onOutsideTargetClick = () => {
    if (clicksLeft > 0) {
      if (clicksLeft === MAX_CLICKS && startTime === 0) {
        setStartTime(Date.now());
      }
      setMissedClicks((prev) => prev + 1);
      setClicksLeft((prev) => prev - 1);
    }
  };

  const resetGame = () => {
    setClicksLeft(MAX_CLICKS);
    setMissedClicks(0);
    setStartTime(0);
    setEndTime(0);
    setTargetX(50);
    setTargetY(50);
  };

  useEffect(() => {
    if (clicksLeft === 0 && startTime !== 0) {
      setEndTime(Date.now());
    }
  }, [clicksLeft, startTime]);

  return (
    <div className={styles.AimTrainer}>
      {clicksLeft > 0 ? (
        <>
          <div className={styles.turnsLeft}>Turns Left : {clicksLeft}</div>
          <div className={styles.gameContainer} onClick={onOutsideTargetClick}>
            <div
              className={styles.aimTarget}
              style={{ left: `${targetX}%`, top: `${targetY}%` }}
              onClick={onTargetClick}
            >
              <Timer />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.turnsLeft}>Your Final Score</div>

          <div className={styles.gameContainer}>
            <div className={styles.finalStat}>
              Accuracy :{" "}
              {(((MAX_CLICKS - missedClicks) / MAX_CLICKS) * 100).toFixed(2)} %
            </div>
            <div className={styles.finalStat}>
              Time Taken: {((endTime - startTime) / 1000).toFixed(2)} seconds
            </div>
            <div className={styles.buttonSection}>
              <button className={styles.saveScoreButton}>Save score</button>
              <button onClick={resetGame}>Try again</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
