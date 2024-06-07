import { motion } from "framer-motion";
import styles from "./typingGame.module.css";
import {
  gameContainerVariants,
  opacityFadeVariants,
} from "../../assets/animationVariants";
import { useEffect, useState } from "react";

export default function TypingGame() {
  const slicedTypeText =
    "Rano budzę się w przyczepie, z kacem jak stąd do Kanady. Ricky leży obok, przebrany za kurczaka. Julian próbuje zrobić kawę, ale zamiast wody, wlewa piwo do ekspresu. Lahey już od szóstej rano drze się na całe osiedle. Tylko Bubbles jak zwykle w porządku, koty nakarmił, bo kto inny by o nie zadbał? Życie w barakach - dzień jak co dzień".split(
      ""
    );

  const [userInputText, setUserInputText] = useState("");
  const [timerSEC, setTimerSEC] = useState(0);
  const [userStartedTyping, setUserStartedTyping] = useState(false);

  useEffect(() => {
    if (userInputText.length === 1) {
      setUserStartedTyping(true);
    }
  }, [userInputText]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (userStartedTyping) {
      timer = setInterval(() => {
        setTimerSEC((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [userStartedTyping]);

  return (
    <div className={styles.typingGame}>
      <motion.div
        variants={opacityFadeVariants}
        initial="hidden"
        animate="visible"
        className={styles.timer}
      >
        {userStartedTyping
          ? "Time : " + timerSEC
          : "Start Typing To Begin The Test"}
      </motion.div>
      <motion.div
        variants={gameContainerVariants}
        initial="hidden"
        animate="visible"
        className={styles.gameContainer}
      >
        <div className={styles.textContainer}>
          {slicedTypeText.map((letter, index) => (
            <div
              className={styles.letter}
              key={index}
              style={{
                width: letter === " " ? "10px" : "",
                marginBottom: letter === " " ? "-11px" : "0px",
                backgroundColor:
                  userInputText[index] === slicedTypeText[index]
                    ? "green"
                    : userInputText.length - 1 >= index
                    ? "red"
                    : "",
              }}
            >
              {letter}
            </div>
          ))}
        </div>
        <textarea
          spellCheck={false}
          className={styles.textInput}
          onChange={(e) => setUserInputText(e.target.value)}
        />
      </motion.div>
    </div>
  );
}
