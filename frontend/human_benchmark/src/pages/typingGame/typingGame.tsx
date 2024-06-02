import { motion } from "framer-motion";
import styles from "./typingGame.module.css";
import { gameContainerVariants } from "../../assets/animationVariants";
import { useState } from "react";

export default function TypingGame() {
  const slicedTypeText =
    "Once upon a time, in a small village nestled between rolling hills, there lived a young girl named Lily. Lily loved to explore the woods behind her house, where she often found herself lost in the wonders of nature. One sunny afternoon, she stumbled upon a hidden path she had never seen before. Curious and excited, she decided to follow it".split(
      ""
    );

  const [userInputText, setUserInputText] = useState("");
  // const slicedTypeTextRef = useRef(slicedTypeText);

  // useEffect(() => {
  //   if (
  //     userInputText[userInputText.length - 1] ===
  //     slicedTypeText[userInputText.length - 1]
  //   ) {

  //   }
  // }, [userInputText]);
  // const styleTextBackgroundColor = () => {};
  return (
    <div className={styles.typingGame}>
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

                // height: letter === " " ? "50px" : "50px",

                backgroundColor:
                  userInputText[index] === slicedTypeText[index]
                    ? "green"
                    : userInputText.length - 1 >= index
                    ? "red"
                    : "",
              }}
              // style={{ backgroundColor: `rgb(0,0,${index % 255})` }}
            >
              {letter}
            </div>
          ))}
          {/* {slicedTypeText} */}
        </div>
        <textarea
          className={styles.textInput}
          onChange={(e) => setUserInputText(e.target.value)}
        />
      </motion.div>
    </div>
  );
}
