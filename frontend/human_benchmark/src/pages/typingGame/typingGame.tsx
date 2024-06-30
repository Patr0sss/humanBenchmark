import { motion } from "framer-motion";
import styles from "./typingGame.module.css";
import {
  gameContainerVariants,
  opacityFadeVariants,
} from "../../assets/animationVariants";
import { useEffect, useState } from "react";
import axios from "axios";



export default function TypingGame() {
  const typeText =
    "Rano budzę się w przyczepie, z kacem jak stąd do Kanady. Ricky leży obok, przebrany za kurczaka. Julian próbuje zrobić kawę, ale zamiast wody, wlewa piwo do ekspresu. Lahey już od szóstej rano drze się na całe osiedle. Tylko Bubbles jak zwykle w porządku, koty nakarmił, bo kto inny by o nie zadbał? Życie w barakach - dzień jak co dzień";
  const slicedTypeText =
    "Rano budzę się w przyczepie, z kacem jak stąd do Kanady. Ricky leży obok, przebrany za kurczaka. Julian próbuje zrobić kawę, ale zamiast wody, wlewa piwo do ekspresu. Lahey już od szóstej rano drze się na całe osiedle. Tylko Bubbles jak zwykle w porządku, koty nakarmił, bo kto inny by o nie zadbał? Życie w barakach - dzień jak co dzień".split(
      ""
    );

  const [userInputText, setUserInputText] = useState("");
  const [timerSEC, setTimerSEC] = useState(0);
  const [userStartedTyping, setUserStartedTyping] = useState(false);
  const [isTextProperlyRewrited, setIsTextProperlyRewrited] = useState(false);

  const [data, setData] = useState(null);



  // data from api
  useEffect(() => {
      const fetchData = async () => {
          const options = {
              method: 'GET',
              url: 'https://fake-data3.p.rapidapi.com/fk/texts',
              params: { _characters: '500' },
              headers: {
                  'x-rapidapi-key': `${process.env.X_RAPIDAPI_KEY}`,
                  'x-rapidapi-host': `${process.env.X_RAPIDAPI_HOST}`
              }
          };

          try {
              const response = await axios.request(options);
              setData(response.data);
          } catch (error) {
              console.error(error);
          }
      };

      fetchData();
  }, []);

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
    let timer: ReturnType<typeof setInterval>;

    if (userStartedTyping) {
      timer = setInterval(() => {
        setTimerSEC((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [userStartedTyping, isTextProperlyRewrited]);

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
          <div className={styles.timer}>Final Time : {timerSEC}s</div>
        ) : (
          <>
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
          </>
        )}
      </motion.div>
    </div>
  );
}
