import {useState} from "react";
import styles from './speedClicker.module.css';

export default function speedClicker() {
   const [clickerValue, setClickerValue] = useState<number>(0);
   const [isGameOnValue, setIsGameOnValue] = useState<boolean>(false);
    
    const onClickGameStart = () => {
        setIsGameOnValue(true);
        setClickerValue(1);


    }

    return (
        <div className={styles.speedClicker}>
            <div className={styles.gameContainer}>  
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

          
            </div>
        </div>
        
    );
}