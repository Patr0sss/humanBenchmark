import { useState, useEffect } from "react";
import "./findGame.css"
import Treasure from "../../assets/treasure";

const FindGame = () => {
    const number = 30; 
    const finalGridSize = 20;
    const intervalDuration = 5000;
    const [gridItems, setGridItems] = useState<JSX.Element[]>([]);
    const [finalGridItems, setFinalGridItems] = useState<number[]>([]);
    const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
    const [savedNumber, setSavedNumber] = useState<number | null>(null);
    const [isBoard, setIsBoard] = useState<boolean>(true);
    const [result, setResult] = useState<number[]>([]);
    const [arrayOfClicked, setArrayOfClicked] = useState<number[]>([]);
    const [isGameLoaded, setIsGameLoaded] = useState<boolean>(false);
    const [totalRounds, setTotalRounds] = useState<number>(0);
    const [isClicked, setIsClicked] = useState<boolean[]>(Array(finalGridSize - totalRounds).fill(false));
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [count, setCount] = useState(0);
    const [isGameWon,setIsGameWon] = useState<boolean>(false);
    const [bgColor, setBgColor] = useState<string>("bg-[#131010]");
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);


    // losowanie liczb
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
    
    // tasowanie liczb
    const shuffleArray = (array: any[]) => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // liczby do wyboru w finalnej wersji
    const generateGridItemsToChoose = (result: number[]) => {
        const randomNumbers = Array.from({ length: 20 - totalRounds }, () =>
            Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        );

        const combinedNumbers = [...randomNumbers, ...result];
        const shuffledArray = shuffleArray(combinedNumbers);
        setFinalGridItems(shuffledArray);
    };

    // wybieranie liczb w koncowym etapie gry
    const handleFinalClick = (idx: number) => {
        if (arrayOfClicked.length < totalRounds || isClicked[idx] === true) {
            setIsClicked((prevClicked) => {
                const newClicked = [...prevClicked];
                newClicked[idx] = !newClicked[idx];
                return newClicked;
            });
            if (isClicked[idx] === true) {
                setArrayOfClicked(prevArray => prevArray.filter(item => item !== finalGridItems[idx]));
            } else {
                setArrayOfClicked(prevArray => [...prevArray, finalGridItems[idx]]);
            }
        }

    };
    
    // funkcja do klikniecia danej ramki z liczba 
    const handleClick = (num: number) => () => {
        setSavedNumber((prevSavedNumber) => {
            const nextList = [...result, prevSavedNumber!];
            if (num === prevSavedNumber) {
                setResult(prevList => nextList);
                setNumberOfRounds((prevRounds) => prevRounds + 1);
                setIsAnimating(false);
                setBgColor("bg-[#008000]");
                setTimeout(() => setBgColor("bg-[#131010]"), 100);
                setCount((count) => count+1)
            } else {
                setIsAnimating(false);
                setBgColor("bg-[#FF0000]");
                setTimeout(() => setBgColor("bg-[#131010]"), 100);
                setCount((count) => count+1)
                generateGridItems();
            }
            if (numberOfRounds === totalRounds) {
                setIsBoard(false);
                generateGridItemsToChoose(nextList);
            }
            return prevSavedNumber;
        });

    };

    // funkcja pomocnicza do generowania grida z liczbami
    const helpFunc = () => {
        setIsAnimating(false);
        generateGridItems();
        setTimeout(() => setIsAnimating(true), 100);
    }

    useEffect(() => {
        if (!isStarted) return;
        generateGridItems();
        setIsAnimating(true);
        const intervalId = setInterval(() => {
            helpFunc();
        }, 10000);

        return () => clearInterval(intervalId);
    }, [numberOfRounds, isStarted, count]);


    // ustawianie poziomu
    const handleLevel = (num: number) => {
        setTotalRounds(num);
        setIsGameLoaded(true);
    }


    // funkcja sprawdzajaca czy wartosci sa rowne 
    const arraysEqual = (arr1: number[], arr2: number[]): boolean => {
        if (arr1.length !== arr2.length) {
            return false;
        }
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    };
    
    // finalna odpowiedz funkcja do potwierdzenia, przycisk
    const handleConfirm = () => {
        const sortedUserChoice = arrayOfClicked.slice().sort();
        const sortedPicked = result.slice().sort();
        if (arraysEqual(sortedUserChoice, sortedPicked)) {
            setIsGameWon(true);
            setEndTime(Date.now());
        } else {
            setIsClicked(Array(finalGridSize - totalRounds).fill(false));
            setArrayOfClicked([]);
            generateGridItemsToChoose(result);
        }
    }

    // funkcja do startu gry
    const handleStart = () => {
        setIsStarted(true);
        setStartTime(Date.now());
    }

    const handleGameMenu = () => {
        setIsBoard(true);
        setIsGameLoaded(false);
        setIsGameWon(false);
        setGridItems([]);
        setFinalGridItems([]);
        setNumberOfRounds(1);
        setSavedNumber(null);
        setResult([]);
        setArrayOfClicked([]);
        setIsClicked(Array(finalGridSize - totalRounds).fill(false));
        setIsStarted(false);
        setIsAnimating(false);
        setCount(0);
        setStartTime(0);
        setEndTime(0);
    }

    return (
        <div className='h-[calc(100vh-60px)] mt-[60px] w-full min-h-[500px] flex flex-col justify-center items-center'>
            {!isGameLoaded ?
                <div className='mt-[60px] text-3xl p-4'>FIND GAME</div>
                :
                null
            }
            <div className={`${bgColor} w-[80%] h-[80%] mx-auto rounded-[10px] relative mb-[5%] border-2 border-[#783dcb] flex justify-center items-center`}>
                {isGameLoaded && !isGameWon && (isBoard ?
                    <>
                        <div className="absolute top-0">
                            <h1 className="py-1">{numberOfRounds}/{totalRounds}</h1>
                            <h1 className="py-2">FIND AND REMEMBER NUMBERS</h1>
                            <h1 className="text-2xl font-bold ">{savedNumber}</h1>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-6 gap-6">
                            {gridItems}
                        </div>
                        {!isStarted &&
                            <div className="absolute top-[50%]">
                                <h1 className="p-4 font-bold bg-[#783dcb] cursor-pointer" onClick={handleStart}>START</h1>
                            </div>
                        }
                        <div className="progress-bar-container">
                            {isAnimating && <div className="progress-bar"></div>}
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
                        <div className="absolute bottom-0 mb-[10%]">
                            <div className='flex px-6 py-1 text-start border-[#783dcb] border-2 rounded-2xl text-xl cursor-pointer' onClick={handleConfirm}>Confirm</div>
                        </div>
                    </>
                )}
                {!isGameLoaded && (
                    <>
                        <div className={`grid grid-cols-1 grid-rows-5 text-black gap-8 ${isGameLoaded ? "hidden" : "visible"} font-bold flex`}>
                            <button className='py-4 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-emerald-600 from-5% via-emerald-300 to-emerald-600 to-95% mx-auto uppercase' onClick={() => handleLevel(2)}>2 ROUNDS</button>
                            <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-green-600 from-5% via-green-300 to-green-600 to-95% mx-auto uppercase' onClick={() => handleLevel(3)}>3 ROUNDS</button>
                            <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-orange-600 from-5% via-orange-300 to-orange-600 to-95% mx-auto uppercase' onClick={() => handleLevel(5)}>5 ROUNDS</button>
                            <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-rose-800 from-5% via-rose-400 to-rose-800 to-95% mx-auto uppercase' onClick={() => handleLevel(8)}>8 ROUNDS</button>
                            <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-red-700 from-5% via-red-400 to-red-700 to-95% mx-auto uppercase' onClick={() => handleLevel(10)}>10 ROUNDS</button>
                        </div>
                    </>
                )}
                {isGameWon ? 
                    <div className='absolute inset-0 z-10 flex items-center justify-center'>
                    <div className='relative max-w-[400px]'>
                        <div className='flex items-center justify-center'>
                            <Treasure />
                        </div>
                        <div className='mt-8 text-4xl'>
                            You won in <span className='text-[#783dcb] font-bold relative'>{((endTime - startTime)).toFixed(2)} ms</span>
                        </div>
                        <button className='items-center justify-center mx-auto my-4 bg-[#131010] text-[#783dcb] border-4 border-[#783dcb] text-xl font-bold mt-8 ' onClick={handleGameMenu}>Try again</button>
                    </div>
                </div>
                :
                null
                }
            </div>
        </div>
    );
};

export default FindGame;
