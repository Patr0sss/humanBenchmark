import styles from "./sequenceMemory.module.css";
import { motion } from "framer-motion";
import { gameContainerVariants } from "../../assets/animationVariants";
import { useEffect, useState } from "react";

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

  const [message, setMessage] = useState("");

  const generateRandomArray = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 9) + 1);
  };

  const userSectionAppend = (num: number) => {
    setUserSequence(() => [...userSequence, num]);
  };

  const arraysAreEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((value, index) => value === arr2[index]);
  };

  const animateNewSequence = () => {
    setUserSequence([]);
    const newSequence = generateRandomArray(roundCount);
    setSequence(newSequence);
    let index = 0; // Indeks aktualnie kolorowanego kafelka
    setIsAnimating(true);

    const interval = setInterval(() => {
      // Sprawdzamy, czy doszliśmy do końca sekwencji
      if (index === newSequence.length) {
        clearInterval(interval); // Zatrzymujemy interval
        setRoundCount(roundCount + 1); // Zwiększamy licznik rundy
        return;
      }

      const currentNumber = newSequence[index]; // Aktualny numer w sekwencji

      // Znajdujemy indeks kafelka o wartości currentNumber
      const tileIndex = gridObjects.findIndex(
        (tile) => tile.value === currentNumber
      );

      if (tileIndex !== -1) {
        // Ustawiamy kolor na czerwony dla aktualnego kafelka
        setGridObjects((prevGridObjects) =>
          prevGridObjects.map((tile, i) =>
            i === tileIndex ? { ...tile, color: "#783dcb" } : tile
          )
        );

        // Ustawiamy kolor na pierwotny po 500 ms
        setTimeout(() => {
          setGridObjects((prevGridObjects) =>
            prevGridObjects.map((tile, i) =>
              i === tileIndex ? { ...tile, color: "#302c2c" } : tile
            )
          );
        }, 400);
      }

      index++; // Przechodzimy do następnego numeru w sekwencji
    }, 900); // Interwał między kolorowaniem kolejnych kafelków

    setTimeout(() => {
      setIsAnimating(false);
    }, newSequence.length * 900 + 900);
  };

  useEffect(() => {
    setMessage("");
    if (
      userSequence.length >= sequence.length &&
      !arraysAreEqual(userSequence, sequence)
    ) {
      console.log("Zjebałeś");
      setMessage("Zjebałeś");
    }

    if (arraysAreEqual(sequence, userSequence) && sequence.length > 0) {
      console.log("BRAWO");
      setMessage("BRAWO");
    }
  }, [sequence, userSequence]);

  return (
    <div className={styles.sequenceMemory}>
      <motion.div
        variants={gameContainerVariants}
        initial="hidden"
        animate="visible"
        className={styles.gameContainer}
      >
        {gridObjects.map((tile, index) => (
          <div
            className={styles.tile}
            key={index.toString()}
            onClick={() => userSectionAppend(tile.value)}
            style={{ backgroundColor: tile.color }}
          ></div>
        ))}
        <div>{message}</div>

        <div
          onClick={animateNewSequence}
          className={styles.generateButton}
          style={{ backgroundColor: isAnimating ? "red" : "green" }}
        >
          Generate
        </div>
        <div></div>
        <div></div>
      </motion.div>
    </div>
  );
}
