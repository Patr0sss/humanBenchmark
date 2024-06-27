import {useState, useEffect, useRef} from "react";
import { gameContainerVariants } from "../../assets/animationVariants";
import styles from './speedClicker.module.css';
import { motion } from "framer-motion";

export default function speedClicker() {
   const [clickerValue, setClickerValue] = useState<number>(0);
   const [isGameOnValue, setIsGameOnValue] = useState<boolean>(false);
   const [isGameOver, setGameOver] = useState<boolean>(false);
   const intervalRef = useRef<number>();
   const [now, setNow] = useState<number>();
   const [startTime, setStartTime] = useState<number>();  
   const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
   const [initialTime, setInitialTime] = useState<number>(0);

    const onClickInitializeGame = () => {
        setIsGameOnValue(true);
        setGameOver(false);
        setClickerValue(1);
        setStartTime(Date.now());
        setNow(Date.now());

        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 10);


    }
    const onClickGame = () => {
        setClickerValue(clickerValue+1);
    }
    const onClickReset = () => {
      setIsGameOnValue(false);
      setClickerValue(0);
      setGameOver(false);
      setIsGameLoaded(false);
    }
    const onClickSaveScore = () => {

    }

    
    let secondsPassed = 0;  
    if (startTime != null && now != null) {
      secondsPassed = (now - startTime) / 1000;
    }
    

    useEffect(() => {
      if (isGameOnValue && secondsPassed >= initialTime) {
          clearInterval(intervalRef.current);
          setIsGameOnValue(false); // Zatrzymaj grę
          setGameOver(true);
      }
  }, [secondsPassed, initialTime]);

  const handleTime = (time : number) => {
    setInitialTime(time);
    setIsGameLoaded(true);
    
}


    
    return (
        <div className={styles.speedClicker}>
            <motion.div 
             className={styles.gameContainer}
             variants={gameContainerVariants}
             initial="hidden"
             animate="visible"
             >  
             {isGameLoaded ? (
              <>
                <div className={styles.statsBlock}>
                    <div className={styles.timeBlock}>
                      <p>Time</p>
                      {isGameOnValue ? (initialTime - secondsPassed).toFixed(3) : (<>0</>)}
                    </div>
                    <div className={styles.clicksBlock}>
                      <p>Click/s</p>
                      {clickerValue > 0 ? (clickerValue/secondsPassed).toFixed(3) : (<></>)}
                    </div>
                    <div className={styles.clickBlock}>
                      <p>Click</p>
                      {clickerValue > 0 ?  clickerValue : (<></>)}
                    </div>
                </div>
                <div className={styles.buttonBlock}>{isGameOnValue && !isGameOver ? ( 
                  <button disabled={ secondsPassed >= initialTime } onClick={onClickGame}>  </button>
                
                ) : isGameOver ? (
                  <>
                  <div className={styles.setBlock}>
                    <div className={styles.buttonBlock}> <button onClick={onClickReset}> Try Again </button></div>
                    <div className={styles.buttonBlock}><button onClick={onClickSaveScore}> Save Score </button></div>
                  </div>
                  </>
                  ) : (
                  <button  onClick={onClickInitializeGame}> Click here to start! </button>
                )} 
                </div>
              </>) : (
                <div className={styles.setBlock}>
                  <div className={styles.buttonTimeBlock}><button onClick={() => handleTime(5)}>5 Seconds</button></div>
                  <div className={styles.buttonTimeBlock}><button onClick={() => handleTime(10)}>10 Seconds</button></div>
                  <div className={styles.buttonTimeBlock}><button onClick={() => handleTime(15)}>15 Seconds</button></div>
                  <div className={styles.buttonTimeBlock}><button onClick={() => handleTime(20)}>20 Seconds</button></div>
                  <div className={styles.buttonTimeBlock}><button onClick={() => handleTime(25)}>25 Seconds</button></div>
                </div>
              )}
            </motion.div>
        </div>
        
    );
}