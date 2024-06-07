import { useState, useEffect } from "react";

const FindGame = () => {
    const number = 30; 
    const totalRounds = 1;
    const [gridItems, setGridItems] = useState<JSX.Element[]>([]);
    const [finalGridItems, setFinalGridItems] = useState<number[]>([]);
    const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
    const [savedNumber, setSavedNumber] = useState<number | null>(null);
    const [isBoard, setIsBoard] = useState<boolean>(true);
    const [result, setResult] = useState<number[]>([]);
    const [isClicked, setIsClicked] = useState<boolean[]>(Array(20 - totalRounds).fill(false));
    const [numberOfClicked,setNumberOfClicked] = useState<number>(0);

    const generateGridItems = () => {
        const randomNumbers = Array.from({ length: number }, () =>
            Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        );
        const items = randomNumbers.map((num, idx) => (
            <div key={idx} className="p-2 text-lg text-white bg-black hover:bg-[#783dcb] cursor-pointer" onClick={handleClick(num)}>
                {num}
            </div>
        ));
        const randomIndex = Math.floor(Math.random() * randomNumbers.length);
        const savedNum = randomNumbers[randomIndex];
        setGridItems(items);
        setSavedNumber(savedNum);
    };

    const shuffleArray = (array: any[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateGridItemsToChoose = () => {
        const randomNumbers = Array.from({ length: 20 - totalRounds }, () =>
            Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        );

        randomNumbers.push(...result);
        const shuffledArray = shuffleArray(randomNumbers);
        setFinalGridItems(shuffledArray);
    };
    
    const handleFinalClick = (idx: number) => {
        setIsClicked((prevClicked) => {
            const newClicked = [...prevClicked];
            newClicked[idx] = !newClicked[idx];
            return newClicked;
        });
        const num = numberOfClicked;
        if(isClicked[idx] === true){
            setNumberOfClicked((num) => num-1);
        }else{
            setNumberOfClicked((num) => num+1);
        }
    };

    const handleClick = (num: number) => () => {
        setSavedNumber((prevSavedNumber) => {
            const nextList = [...result, prevSavedNumber!];
            setResult(nextList);
            if (numberOfRounds === totalRounds) {
                setIsBoard(false);
                generateGridItemsToChoose();
            } else if (num === prevSavedNumber) {
                setNumberOfRounds((prevRounds) => prevRounds + 1);
            }
            return prevSavedNumber;
        });
    };

    useEffect(() => {
        generateGridItems();
        const intervalId = setInterval(() => {
            generateGridItems(); 
        }, 35000); 
        return () => clearInterval(intervalId);
    }, [numberOfRounds]); 

    return (
        <div className='h-[calc(100vh-60px)] mt-[60px] w-full min-h-[500px] flex flex-col justify-center items-center'>
            <div className="bg-[#131010] w-[80%] h-[80%] mx-auto rounded-[10px] relative mb-[5%] border-2 border-[#783dcb] flex justify-center items-center">
                {isBoard ? 
                <>
                    <div className="absolute top-0">
                        <h1 className="py-1">{numberOfRounds}/{totalRounds}</h1>
                        <h1 className="py-2">FIND AND REMEMBER NUMBERS</h1>
                        <h1 className="text-2xl font-bold ">{savedNumber}</h1>
                    </div>
                    <div className="grid grid-cols-5 grid-rows-6 gap-6">
                        {gridItems}
                    </div>
                </>
                : 
                <>
                    <div className="absolute top-0 mt-[10%]">
                        <h1 className="py-4 font-bold">CHOOSE CORRECT</h1>
                    </div>
                    <div className="grid grid-cols-5 grid-rows-4 gap-6">
                        {finalGridItems.map((num, idx) => (
                            <div
                                key={idx}
                                className={`p-2 text-lg text-white cursor-pointer ${isClicked[idx] ? 'bg-green-600' : 'bg-black'}`}
                                onClick={() => handleFinalClick(idx)}
                            >
                                {num}
                            </div>
                        ))}
                    </div>
                </>
                }
            </div>
        </div>
    );  
};

export default FindGame;
