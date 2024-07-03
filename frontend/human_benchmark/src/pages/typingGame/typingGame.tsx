import { motion } from "framer-motion";
import styles from "./typingGame.module.css";
import {
  gameContainerVariants,
  opacityFadeVariants,
} from "../../assets/animationVariants";
import { useEffect, useState } from "react";

export default function TypingGame() {
  const [userInputText, setUserInputText] = useState("");
  const [timerSEC, setTimerSEC] = useState(0);
  const [userStartedTyping, setUserStartedTyping] = useState(false);
  const [isTextProperlyRewrited, setIsTextProperlyRewrited] = useState(false);
  const [typeText, setTypeText] = useState("static");
  const wordsArray = typeText.split(" ");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/random_story")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Wrong response");
        }
        return response.json();
      })
      .then((data) => {
        setTypeText(data.story);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }, []);

  const resetGame = () => {
    setIsTextProperlyRewrited(false);
    setUserInputText("");
    setTimerSEC(0);
  };

  useEffect(() => {
    if (userInputText.length === 1) {
      setUserStartedTyping(true);
    }

    if (userInputText === typeText) {
      setIsTextProperlyRewrited(true);
    }

    if (isTextProperlyRewrited) {
      setUserStartedTyping(false);
    }
  }, [isTextProperlyRewrited, userInputText]);

  useEffect(() => {
    let timer;

    if (userStartedTyping) {
      timer = setInterval(() => {
        setTimerSEC((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [userStartedTyping, isTextProperlyRewrited]);

  const getHighlightedWord = (word, wordIndex) => {
    const userInputWords = userInputText.split(" ");
    const userWord = userInputWords[wordIndex] || "";

    return word.split("").map((letter, letterIndex) => {
      
      const isCorrect = userWord[letterIndex] === letter;
      const isIncorrect = userWord[letterIndex] && userWord[letterIndex] !== letter;

      return (
        <span
          key={letterIndex}
          style={{
            backgroundColor: isCorrect
              ? "green"
              : isIncorrect
              ? "red"
              : "",
          }}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <div className={styles.typingGame}>
      <motion.div
        variants={opacityFadeVariants}
        initial="hidden"
        animate="visible"
        className={styles.timer}
      >
        {userStartedTyping ? (
          <div>Time : {timerSEC}s</div>
        ) : isTextProperlyRewrited ? (
          <div></div>
        ) : (
          <div>Start Typing To Begin The Test</div>
        )}
      </motion.div>
      <motion.div
        variants={gameContainerVariants}
        initial="hidden"
        animate="visible"
        className={styles.gameContainer}
      >
        {isTextProperlyRewrited ? (
          <div>
            <div className={styles.timer}>Final Time : {timerSEC}s</div>
            <div className={styles.lostButton} onClick={resetGame}>
              Try Again
            </div>
          </div>
        ) : (
          <>
            <div className={styles.textContainer}>
              {wordsArray.map((word, wordIndex) => (
                <span key={wordIndex} className={styles.word}>
                  {getHighlightedWord(word, wordIndex)}{" "}
                </span>
              ))}
            </div>
            <textarea
              spellCheck={false}
              className={styles.textInput}
              onChange={(e) => setUserInputText(e.target.value)}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
