import { useEffect, useState } from "react";
import Timer from "../../assets/timer";
import styles from "./aimTrainer.module.css";
import { motion } from "framer-motion";
import Duck from "../../assets/duck";
import duckSound from "/duck.mp3";
import backgroundMusic from "/backgroundMusic.wav";
import WaterLily from "../../assets/waterLily";
// import Angry from "../../assets/angry";
// import Ufo from "../../assets/ufo";

export default function AimTrainer() {
  const MAX_CLICKS = 12;
  const [targetX, setTargetX] = useState(50);
  const [targetY, setTargetY] = useState(50);
  const [clicksLeft, setClicksLeft] = useState(MAX_CLICKS);
  const [missedClicks, setMissedClicks] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const gameContainerVariants = {
    hidden: {
      y: "100vh",
      scale: 0,
    },
    visible: {
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const opacityFadeVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };

  const onTargetClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();
    if (clicksLeft > 0) {
      if (clicksLeft === MAX_CLICKS && startTime === 0) {
        setStartTime(Date.now());
      }
      new Audio(duckSound).play();
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

  const [bgMusic] = useState(new Audio(backgroundMusic));
  useEffect(() => {
    if (clicksLeft === 0 && startTime !== 0) {
      setEndTime(Date.now());
    }

    if (clicksLeft === MAX_CLICKS - 1) {
      bgMusic.play();
    }

    if (clicksLeft === 0) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, [bgMusic, clicksLeft, startTime]);

  return (
    <div className={styles.AimTrainer}>
      {clicksLeft > 0 ? (
        <>
          <motion.div
            variants={opacityFadeVariants}
            initial="hidden"
            animate="visible"
            className={styles.turnsLeft}
          >
            {clicksLeft === MAX_CLICKS
              ? "Aim Trainer"
              : `Remaining : ${clicksLeft}`}
          </motion.div>
          <motion.div
            variants={gameContainerVariants}
            initial="hidden"
            animate="visible"
            className={styles.gameContainer}
            onClick={onOutsideTargetClick}
          >
            <div className={styles.waterLily}>
              <WaterLily width={120} />
            </div>
            <div className={styles.waterLily} style={{ left: "85%" }}>
              <WaterLily width={80} />
            </div>
            <div
              className={styles.aimTarget}
              style={{ left: `${targetX}%`, top: `${targetY}%` }}
              onClick={onTargetClick}
            >
              <Duck width={110 - 3 * (MAX_CLICKS - clicksLeft)} />
              {/* <Angry width={100 - 3 * (MAX_CLICKS - clicksLeft)} /> */}
              {/* <Ufo width={140 - 3 * (MAX_CLICKS - clicksLeft)} /> */}
            </div>
            {clicksLeft === MAX_CLICKS ? (
              <div className={styles.instructionInfo}>
                <div>Hit {MAX_CLICKS} targets as quickly as you can</div>
                <div>Click the target above to begin</div>
              </div>
            ) : null}
          </motion.div>
        </>
      ) : (
        <>
          <div className={styles.turnsLeft}>Your Final Score</div>

          <div className={styles.gameContainer}>
            <Timer />
            <div className={styles.finalStat}>
              Accuracy :{" "}
              {(((MAX_CLICKS - missedClicks) / MAX_CLICKS) * 100).toFixed(2)} %
            </div>
            <div className={styles.finalStat}>
              Average time per target
              <div className={styles.averageTime}>
                {((endTime - startTime) / MAX_CLICKS).toFixed(2)} ms
              </div>
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
