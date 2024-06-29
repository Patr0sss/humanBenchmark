
import { useEffect, useState } from 'react';
import cardImages from './cardImages.tsx';
import Card from './card.tsx';
import Confetti from './confetti.tsx';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Brain from "../../assets/brain";
import {
    gameContainerVariants,
  } from "../../assets/animationVariants";
import { motion } from "framer-motion";
import "./buttons.css"

interface CardImage {
    src: string;
    id: number;
    matched: boolean;
}

interface LevelState {
    [key: number]: string; 
    numberOfCards?: number;
  }

  interface GridClass {
    [key: number]: string;
    numberOfCards?: number;
}

interface LevelColorMap {
    [key: number]: string;
    numberOfCards?: number;
}


export default function MemoryGame() {
    const [cards, setCards] = useState<CardImage[]>([]);
    const [turns,setTurns] = useState<number>(0);
    const [firstCard,setFirstCard] = useState<CardImage|null>(null);
    const [secondCard,setSecondCard] = useState<CardImage|null>(null);
    const [blockButton,setBlockButton] = useState<boolean>(false);
    const [isGameLoaded,setIsGameLoaded] = useState<boolean>(false);
    const [numberOfColumns,setNumberOfColumns] = useState<string>('grid-cols-2');
    const [cardSize,setCardSize] = useState<number>(128);
    const [correctPicked,setCorrectPicked] = useState<number>(0);
    const [numberOfCards,setNumberOfCards] = useState<number | null>(null);
    const [isGameWon,setIsGameWon] = useState<boolean>(false);
    const [level, setLevel] = useState<LevelState>({
        4: "Very Easy",
        6: "Easy",
        9: "Medium",
        12: "Hard",
        18: "Extreme"
      });

      const [bgColor, setBgColor] = useState<string>("bg-[#131010]");

      const [gridClasses, setGridClasses] = useState<GridClass>({
        4: '3xl:w-[800px] 3xl:h-[400px] lg:w-[800px] lg:h-[400px] md:w-[550px] md:h-[260px] sm:w-[260px] sm:h-[550px] xsm:w-[260px] xsm:h-[560px] w-[260px] h-[550px] md:grid-cols-4 grid-cols-2',
        6: '3xl:w-[700px] 3xl:h-[520px] 2xl:w-[700px] 2xl:h-[520px] xl:w-[700px] xl:h-[520px] lg:w-[700px] lg:h-[520px] md:w-[520px] md:h-[410px] sm:w-[380px] sm:h-[520px] xsm:w-[380px] xsm:h-[520px] w-[320px] h-[440px] md:grid-cols-4 grid-cols-3',
        9: '3xl:w-[1000px] 3xl:h-[490px] 2xl:w-[1000px] 2xl:h-[490px] xl:w-[1000px] xl:h-[490px] lg:w-[750px] lg:h-[360px] md:w-[580px] md:h-[280px] sm:w-[420px] sm:h-[540px] xsm:w-[380px] xsm:h-[520px] w-[250px] h-[530px] md:grid-cols-6 xsm:grid-cols-4 grid-cols-3',
        12: '3xl:w-[1400px] 3xl:h-[510px] 2xl:w-[1150px] 2xl:h-[420px] xl:w-[950px] xl:h-[340px] lg:w-[750px] lg:h-[500px] md:w-[580px] md:h-[460px] sm:w-[350px] sm:h-[550px] xsm:w-[340px] xsm:h-[540px] w-[320px] h-[510px] xl:grid-cols-8 md:grid-cols-6 grid-cols-4',
        18: '3xl:w-[1250px] 3xl:h-[540px] 2xl:w-[1150px] 2xl:h-[500px] xl:w-[1000px] xl:h-[430px] lg:w-[700px] lg:h-[600px] md:w-[580px] md:h-[580px] sm:w-[480px] sm:h-[600px] xsm:w-[350px] xsm:h-[580px] w-[340px] h-[580px] xl:grid-cols-9 sm:grid-cols-7 grid-cols-5',
    });

    const [levelColorMap] = useState<LevelColorMap>({
        4: 'text-green-400',
        6: 'text-green-600',
        9: 'text-orange-600',
        12: 'text-red-400',
        18: 'text-red-600',
    });


    const shuffleCards = (numberOfCards:number): void => {
        const slicedCardImages = cardImages.slice(0, numberOfCards); 
        const twoShuffledCards = 
            [...slicedCardImages, ...slicedCardImages]
            .sort(() => Math.random() - 0.5) 
            .map((card) => ({ ...card, id: Math.random(),matched:false })); 
        setCards(twoShuffledCards);
    };


    useEffect(() => {
        if(firstCard && secondCard){            
            setBlockButton(true);
            if(firstCard?.src === secondCard?.src){
                setBgColor("bg-[#008000]");
                setTimeout(() => setBgColor("bg-[#131010]"), 150);
                setCorrectPicked(correctPicked+1);
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src == firstCard.src){
                            return {...card, matched:true}
                        }else {
                            return card;
                        }
                    })
                })
                turnHandle();
            }else{
                setBgColor("bg-[#FF0000]");
                setTimeout(() => setBgColor("bg-[#131010]"), 150);
                setTimeout(() => turnHandle(),1000);
            }
        }
    }, [firstCard,secondCard])

    useEffect(() => {
        console.log("correctPicked: " + correctPicked);
        console.log("numberOfCards: " + numberOfCards);

        const checkGameStatus = async () => {
            if (numberOfCards !== null && correctPicked === numberOfCards) {
                setIsGameWon(true);
            }
        };

        checkGameStatus();
    }, [correctPicked, numberOfCards]);


    function handleChoice(card: CardImage): void {
        if(firstCard){
            setSecondCard(card)
        }else{
            setFirstCard(card)
        }
    }

    const turnHandle = () => {
        setFirstCard(null);
        setSecondCard(null);
        setTurns(prevTurns => prevTurns + 1);
        setBlockButton(false);
    }

    const handleLevel = (numberOfCards : number) => {
        setNumberOfCards(numberOfCards)
        shuffleCards(numberOfCards);
        setIsGameLoaded(true);
        setTurns(0);
        setCorrectPicked(0);
        console.log("asd: " + numberOfCards)
    }

    const handleGameMenu = () => {
        setIsGameLoaded(false);
        setIsGameWon(false);
    }

    const scrollSlideValue = () => {
        if (window.innerWidth <= 640) {
            return 250;
        } else {
            return 500;
        }
    };

      const slideLeft = () => {
        const slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft - scrollSlideValue();
        } else {
            console.error('Slider element not found');
        }
    };
    
    const slideRight = () => {
        const slider = document.getElementById('slider');
        if (slider) {
            slider.scrollLeft = slider.scrollLeft + scrollSlideValue();
        } else {
            console.error('Slider element not found');
        }
    };
    
    const gridClass = numberOfCards ? gridClasses[numberOfCards] : '';
    const levelName = numberOfCards ? level[numberOfCards] : '';
    const levelClass = numberOfCards ? levelColorMap[numberOfCards] : '';

    return (
            <motion.div 
                className='h-[calc(100vh-60px)] mt-[60px] w-full min-h-[500px] flex flex-col justify-center items-center'
                variants={gameContainerVariants}
                initial="hidden"
                animate="visible"
                >
                {!isGameLoaded ? 
                    <div className='mt-[60px] text-3xl p-4'>Memory game</div>
                :
                <>
                    <div className={`mt-[60px] text-3xl p-4 ${levelClass} uppercase`}>Level: {levelName}</div>
                    <div className='left-0 right-0 flex my-[5px] absolute bottom-0'>
                        <h1 className={`mx-auto ${!isGameLoaded ? "hidden" : "visible"} bg-[#783dcb] p-2 rounded-xl`}>TURNS: {turns}</h1>
                    </div>
                </>
                }
 
                <div className={`${bgColor} w-[80%] h-[80%] mx-auto rounded-[10px] relative mb-[5%] border-2 border-[#783dcb] flex justify-center items-center`}>
                    {isGameWon ?
                        <div className='absolute inset-0 z-10 flex items-center justify-center'>
                            {/* <Confetti/> */}
                            <div className='relative max-w-[400px]'>
                                <div className='flex items-center justify-center'>
                                    <Brain/>
                                </div>
                                <div className='mt-8 text-4xl'>
                                    You won in <span className='text-[#783dcb] font-bold relative'>{turns}</span> turns
                                </div>
                                <button className='items-center justify-center mx-auto my-4 bg-[#131010] text-[#783dcb] border-4 border-[#783dcb] text-xl font-bold mt-8 ' onClick={handleGameMenu}>Try again</button>
                            </div>
                        </div>
                    :
                        null
                    }
                    {isGameLoaded&&!isGameWon ? 
                    
                    <>
                        <div className='flex items-center justify-center'>
                        <div className={`grid gap-8 mx-12 ${gridClass}`}>
                            {cards.map(card => (
                            <Card 
                                key={card.id} 
                                card={card} 
                                handleChoice={handleChoice} 
                                picked={card === firstCard || card === secondCard || card.matched}
                                blockButton={blockButton}
                                size={cardSize}
                            />
                        ))}
                            </div>
                        </div>
                    </>
                    :
                        null
                    }
                    {/* <div className={`grid grid-cols-1 grid-rows-5 text-black gap-8 ${isGameLoaded ? "hidden" : "visible"} font-bold flex`}> */}
                    <div className={`relative flex w-full h-full mt-[50px] items-center justify-center ${isGameLoaded ? "hidden" : "visible"}`}>
                        <MdChevronLeft className="absolute left-0 z-10 mx-1 bg-black rounded-full cursor-pointer border-2 border-[#783dcb]" size={40} onClick={slideLeft} />
                        <div id="slider" className="relative flex items-center h-full overflow-x-scroll whitespace-nowrap scrollbar-hide scroll-smooth">
                            <div className="flex mx-12 space-x-8">
                                <button className="btn" onClick={() => handleLevel(4)}><span>Very Easy</span></button>
                                <button className="btn" onClick={() => handleLevel(6)}><span>Easy</span></button>
                                <button className="btn" onClick={() => handleLevel(9)}><span>Medium</span></button>
                                <button className="btn" onClick={() => handleLevel(12)}><span>Hard</span></button>
                                <button className="btn" onClick={() => handleLevel(18)}><span>Extreme</span></button>
                            </div>
                        </div>
                        <MdChevronRight className="absolute right-0 z-10 items-center mx-1 bg-black rounded-full cursor-pointer border-2 border-[#783dcb]" size={40} onClick={slideRight} />  
                    </div>
                    {/* </div> */}
                    </div>
            </motion.div>
    );
}
