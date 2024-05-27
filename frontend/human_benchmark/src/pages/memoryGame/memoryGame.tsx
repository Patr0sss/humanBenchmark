import { useEffect, useState } from 'react';
import cardImages from './cardImages.tsx';
import Card from './card.tsx';

interface CardImage {
    src: string;
    id: number;
    matched: boolean;
}

export default function MemoryGame() {
    const [cards, setCards] = useState<CardImage[]>([]);
    const [turns,setTurns] = useState<number>(0);
    const [numberOfCards,setNumberOfCards] = useState<number>(1);
    const [firstCard,setFirstCard] = useState<CardImage|null>(null);
    const [secondCard,setSecondCard] = useState<CardImage|null>(null);
    const [blockButton,setBlockButton] = useState<boolean>(false);

    const shuffleCards = (): void => {
        const slicedCardImages = cardImages.slice(0, 8); 
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
                setTimeout(() => turnHandle(),1000);
            }
        }
    }, [firstCard,secondCard])


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

    return (
        <div className='mt-[60px]'>
            <div className='flex'>
                <div className="bg-[#131010] w-[80%] mx-auto rounded-lg my-[10%]">
                    <button onClick={shuffleCards}>Shuffle Cards</button>
                    <div className='flex items-center justify-center w-full p-12'>
                        <div className="grid grid-cols-4 gap-8">
                        {cards.map(card => (
                        <Card 
                            key={card.id} 
                            card={card} 
                            handleChoice={handleChoice} 
                            picked={card === firstCard || card === secondCard || card.matched}
                            blockButton={blockButton}
                        />
                    ))}
                        </div>
                    </div>
                    <h1 className='block'>Turns: {turns}</h1>
                </div>
            </div>
        </div>
    );
}
