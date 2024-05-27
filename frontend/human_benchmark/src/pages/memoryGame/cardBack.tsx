import cardBackground from './assetsMemoryGame/cardBackground.jpg';
import CardFront from './cardFront';
import {motion} from 'framer-motion';

interface CardImage {
    src: string;
    id: number;
    matched: boolean;
}

interface CardBackProps {
    handleChoice: (card: CardImage) => void;
    card: CardImage;
    picked: boolean;
    blockButton: boolean;
}

export default function CardBack({ handleChoice, card, picked, blockButton }: CardBackProps) {
    
    function handleClick(): void {
      if(!blockButton){
        handleChoice(card); 
      }
    }
  
    return (
      picked ? (
        <CardFront src={card.src} />
      ) : (
        <motion.div className="w-[128px] h-[128px] rounded-3xl flip-card-back">
          <img 
            className="border-2 white border- rounded-3xl" 
            src={cardBackground} 
            style={{width:'128px',height:'128px'}} 
            alt="Card Background" 
            onClick={handleClick}
          />
        </motion.div>
      )
    );
  }
