import {motion} from 'framer-motion';

interface CardFrontProps {
    src: string;
}

export default function CardFront({ src }: CardFrontProps) {
    return (
      <motion.div className="w-[128px] h-[128px] flip-card-front">
        <div className='flex items-center justify-center w-full h-full rounded-3xl bg-[#783dcb] border-2 border-white'>
          <img 
            src={src} 
            style={{width:'128px',height:'128px'}} 
            alt="Card Front" 
          />
        </div>
      </motion.div>
    );
  }
