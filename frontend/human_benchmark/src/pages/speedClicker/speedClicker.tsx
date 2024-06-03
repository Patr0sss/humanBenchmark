import {useState} from "react";
import styles from './speedClicker.module.css';

export default function speedClicker() {
   const [clickerValue, updateClickerValue] = useState(0);
   

    return (
        <div className={styles.speedClicker}>
          <div className={styles.startButton}>
            <button> Click here to start! </button>
          </div>
        </ div>
        
    );
}