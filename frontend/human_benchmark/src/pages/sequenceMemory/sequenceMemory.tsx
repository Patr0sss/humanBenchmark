import styles from "./sequenceMemory.module.css";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  gameContainerVariants,
  opacityFadeVariants,
  opacityFadeVariants2,
} from "../../assets/animationVariants";

const initialGridObjects = [
  { value: 1, color: "#302c2c" },
  { value: 2, color: "#302c2c" },
  { value: 3, color: "#302c2c" },
  { value: 4, color: "#302c2c" },
  { value: 5, color: "#302c2c" },
  { value: 6, color: "#302c2c" },
  { value: 7, color: "#302c2c" },
  { value: 8, color: "#302c2c" },
  { value: 9, color: "#302c2c" },
];

export default function SequenceMemory() {
  const [roundCount, setRoundCount] = useState(1);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [sequence, setSequence] = useState<number[]>([]);
  const [gridObjects, setGridObjects] = useState(initialGridObjects);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayRoundCount, setDisplayRoundCount] = useState(1);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [userLost, setUserLost] = useState(false);
  const gameBoardRef = useRef<HTMLDivElement>(null);
  const animateIntervalTimeMS = 900;

  const generateRandomArray = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
  };

  const userSectionAppend = (num: number) => {
    if (sequence.length > 0 && !isAnimating) {
      setUserSequence(() => [...userSequence, num]);
    }
  };

  const arraysAreEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((value, index) => value === arr2[index]);
  };

  const animateNewSequence = () => {
    setUserSequence([]);
    setIsButtonVisible(false);
    const newSequence = generateRandomArray(roundCount);
    setSequence(newSequence);
    let index = 0;
    setIsAnimating(true);

    const interval = setInterval(() => {
      if (index === newSequence.length) {
        clearInterval(interval);
        setRoundCount(roundCount + 1);
        return;
      }

      const currentNumber = newSequence[index];

      setGridObjects((prevGridObjects) =>
        prevGridObjects.map((tile, index) =>
          index === currentNumber - 1 ? { ...tile, color: "#783dcb" } : tile
        )
      );

      setTimeout(() => {
        setGridObjects((prevGridObjects) =>
          prevGridObjects.map((tile, index) =>
            index === currentNumber - 1 ? { ...tile, color: "#302c2c" } : tile
          )
        );
      }, 400);

      index += 1;
    }, animateIntervalTimeMS);

    setTimeout(() => {
      setIsAnimating(false);
    }, newSequence.length * animateIntervalTimeMS);
  };

  const handlePlayAgainButton = () => {
    setUserLost(false);
    setSequence([]);
    setDisplayRoundCount(1);
  };

  useEffect(() => {
    if (
      sequence.length > 0 &&
      userSequence[userSequence.length - 1] !==
        sequence[userSequence.length - 1] &&
      gameBoardRef.current
    ) {
      gameBoardRef.current.style.background = "red";

      setTimeout(() => {
        if (gameBoardRef.current) {
          gameBoardRef.current.style.background = "#0e0c0c";
          setUserLost(true);
          setRoundCount(1);
          setIsButtonVisible(true);
        }
      }, 100);
    }

    if (
      arraysAreEqual(sequence, userSequence) &&
      sequence.length > 0 &&
      gameBoardRef.current
    ) {
      gameBoardRef.current.style.background = "green";
      setDisplayRoundCount(displayRoundCount + 1);

      setTimeout(() => {
        if (gameBoardRef.current) {
          gameBoardRef.current.style.background = "#0e0c0c";
          setIsButtonVisible(true);
        }
      }, 100);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence, userSequence]);

  return (
    <div className={styles.sequenceMemory}>
      {userLost ? (
        <div className={styles.displayRoundCount}></div>
      ) : (
        <motion.div
          className={styles.displayRoundCount}
          variants={opacityFadeVariants}
          initial="hidden"
          animate="visible"
        >
          Sequence Game - Round {displayRoundCount}
        </motion.div>
      )}

      <motion.div
        variants={gameContainerVariants}
        initial="hidden"
        animate="visible"
        className={userLost ? styles.gameContainerLost : styles.gameContainer}
        ref={gameBoardRef}
      >
        {userLost ? (
          <motion.div
            variants={opacityFadeVariants2}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.gameOver}>Game Over</div>
            <div>Total Rounds : {displayRoundCount}</div>
            <div className={styles.lostButtonSection}>
              <div className={styles.lostButton}>Save Score</div>
              <div
                className={styles.lostButton}
                onClick={handlePlayAgainButton}
              >
                Try Again
              </div>
            </div>
          </motion.div>
        ) : (
          <>
            {gridObjects.map((tile, index) => (
              <div
                className={styles.tile}
                key={index.toString()}
                onClick={() => userSectionAppend(tile.value)}
                style={{ backgroundColor: tile.color }}
              ></div>
            ))}
            <div></div>
            {isButtonVisible ? (
              <div
                onClick={animateNewSequence}
                className={styles.generateButton}
              >
                Play
              </div>
            ) : (
              <div style={{ height: "45px" }}></div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}