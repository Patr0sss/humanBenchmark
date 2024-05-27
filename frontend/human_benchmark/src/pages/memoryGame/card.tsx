
import CardFront from "./cardFront";
import CardBack from "./cardBack";
import {motion} from 'framer-motion';

interface CardImage {
    src: string;
    id: number;
    matched: boolean;
}

interface CardProps {
    handleChoice: (card: CardImage) => void;
    card: CardImage;
    picked: boolean;
    blockButton: boolean;
}

export default function Card({ card, handleChoice, picked, blockButton }: CardProps) {
    return (
      <div className="card">
        <motion.div
          className={`flip-card-inner ${picked ? 'flip' : ''}`}
          animate={{ rotateY: picked ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {card.matched ? (
            <CardFront src={card.src} />
          ) : (
            <CardBack card={card} handleChoice={handleChoice} picked={picked} blockButton={blockButton}/>
          )}
        </motion.div>
      </div>
    );
  }
