import {useState} from "react";
import { gameContainerVariants } from "../../assets/animationVariants";
import styles from './speedClicker.module.css';
import { motion } from "framer-motion";

export default function speedClicker() {
   const [clickerValue, setClickerValue] = useState<number>(0);
   const [isGameOnValue, setIsGameOnValue] = useState<boolean>(false);
    
    const onClickGameStart = () => {
        setIsGameOnValue(true);
        setClickerValue(1);


    }

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
                <button>  </button>
              </>
              )}
              </div>
              

          
            </motion.div>
        </div>
        
    );
}