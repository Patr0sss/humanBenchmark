import {useState, useEffect, useRef} from "react";
import { gameContainerVariants } from "../../assets/animationVariants";
import styles from './speedClicker.module.css';
import { motion } from "framer-motion";

export default function speedClicker() {
   const [clickerValue, setClickerValue] = useState<number>(0);
   const [isGameOnValue, setIsGameOnValue] = useState<boolean>(false);
   const intervalRef = useRef<number>();
   const [now, setNow] = useState<number>();
   const [startTime, setStartTime] = useState<number>();  

    const onClickGameStart = () => {
        setIsGameOnValue(true);
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
    
    let secondsPassed = 0;
    if (startTime != null && now != null) {
      secondsPassed = (now - startTime) / 1000;
    }
    const initialTime = 5;  



    
    return (
        <div className={styles.speedClicker}>
            <motion.div 
             className={styles.gameContainer}
             variants={gameContainerVariants}
             initial="hidden"
             animate="visible"
             >  
              <div className={styles.statsBlock}>
                  <div className={styles.timeBlock}>
                    <p>Time</p>
                    {isGameOnValue ? (initialTime - secondsPassed).toFixed(3) : (<></>)}
                  </div>
                  <div className={styles.clicksBlock}>
                    <p>Click/s</p>
                    
                  </div>
                  <div className={styles.clickBlock}>
                    <p>Click</p>
                    {clickerValue > 0 ? (<>{clickerValue}</>) : (<></>)}
                  </div>
              </div>
              <div className={styles.buttonBlock}>{!isGameOnValue ?( 
              <button  onClick={onClickGameStart}> Click here to start! </button>
              ) : (
              <>
                <button onClick={onClickGame}>  </button>
              </>
              )}
              </div>
              

          
            </motion.div>
        </div>
        
    );
}