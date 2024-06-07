import { useState, useEffect } from "react";

const FindGame = () => {
    const number = 30; 
    const finalGridSize = 20;
    const [gridItems, setGridItems] = useState<JSX.Element[]>([]);
    const [finalGridItems, setFinalGridItems] = useState<number[]>([]);
    const [numberOfRounds, setNumberOfRounds] = useState<number>(1);
    const [savedNumber, setSavedNumber] = useState<number | null>(null);
    const [isBoard, setIsBoard] = useState<boolean>(true);
    const [result, setResult] = useState<number[]>([]);
    const [arrayOfClicked,setArrayOfClicked] = useState<number[]>([]);
    const [isGameLoaded,setIsGameLoaded] = useState<boolean>(false);
    const [totalRounds, setTotalRounds] = useState<number>(0);
    const [isClicked, setIsClicked] = useState<boolean[]>(Array(finalGridSize - totalRounds).fill(false));

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

    const generateGridItemsToChoose = (result:number[]) => {
        const randomNumbers = Array.from({ length: 20 - totalRounds }, () => 
            Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        );

        const combinedNumbers = [...randomNumbers, ...result];
        const shuffledArray = shuffleArray(combinedNumbers);
        setFinalGridItems(shuffledArray);
    };
    
    const handleFinalClick = (idx: number) => {
        if(arrayOfClicked.length < totalRounds || isClicked[idx] === true){
            setIsClicked((prevClicked) => {
                const newClicked = [...prevClicked];
                newClicked[idx] = !newClicked[idx];
                return newClicked;
            });
            // const num = numberOfClicked;
            if(isClicked[idx] === true){
                setArrayOfClicked(prevArray => prevArray.filter(item => item !== finalGridItems[idx]));
            }else{
                setArrayOfClicked(prevArray => [...prevArray, finalGridItems[idx]]);
            }

            console.log("lista: " + arrayOfClicked);   
        }
        console.log("askdjuhasd: " + finalGridItems);
        console.log("tutaj rezulta: " + result)
        
    };

    const handleClick = (num: number) => () => {
        setSavedNumber((prevSavedNumber) => {
            const nextList = [...result, prevSavedNumber!];
            setResult(prevList => nextList);
            console.log("s,jahd: " + numberOfRounds);
            console.log("s,asd;jijahd: " + totalRounds);
            if (numberOfRounds === totalRounds) {
                setIsBoard(false);
                generateGridItemsToChoose(nextList);
            } 
            if (num === prevSavedNumber) {
                setNumberOfRounds((prevRounds) => prevRounds + 1);
            }else{
                generateGridItems();
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
    
    const handleLevel = (num:number) => {
        setTotalRounds(num);
        setIsGameLoaded(true);
        console.log("lsajdhiasughd: " + totalRounds);
    }

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
    
    const handleConfirm = () => {
        const sortedUserChocie = arrayOfClicked.sort();
        const sortedPicked = result.sort();
        console.log("user puick: " + sortedUserChocie);
        console.log("picked: " + sortedPicked);
        if(arraysEqual(sortedUserChocie,sortedPicked)){
            console.log("dobrze")
        }else{
            setIsClicked(Array(finalGridSize - totalRounds).fill(false));
            setArrayOfClicked([]);
            generateGridItemsToChoose(result);
        }
    }

    return (
        <div className='h-[calc(100vh-60px)] mt-[60px] w-full min-h-[500px] flex flex-col justify-center items-center'>
            {!isGameLoaded ? 
                <div className='mt-[60px] text-3xl p-4'>FIND GAME</div>
                :
                null
            }
            <div className="bg-[#131010] w-[80%] h-[80%] mx-auto rounded-[10px] relative mb-[5%] border-2 border-[#783dcb] flex justify-center items-center">
                {isGameLoaded && (isBoard ? 
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
                        <div className="absolute bottom-0 mb-[10%]">
                            <div className='flex px-6 py-1 text-start border-[#783dcb] border-2 rounded-2xl text-xl cursor-pointer' onClick={handleConfirm}>Confirm</div>
                        </div>
                    </>
                )}
                {!isGameLoaded && (
                    <>
                    <div className={`grid grid-cols-1 grid-rows-5 text-black gap-8 ${isGameLoaded ? "hidden" : "visible"} font-bold flex`}>
                        <button className='py-4 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-emerald-600 from-5% via-emerald-300  to-emerald-600 to-95% mx-auto uppercase' onClick={() => handleLevel(2)}>2 ROUNDS</button>
                        <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-green-600 from-5% via-green-300  to-green-600 to-95% mx-auto uppercase' onClick={() => handleLevel(3)}>3 ROUNDS</button>
                        <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-orange-600 from-5% via-orange-300  to-orange-600 to-95% mx-auto uppercase' onClick={() => handleLevel(5)}>5 ROUNDS</button>
                        <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-rose-800 from-5% via-rose-400  to-rose-800 to-95% mx-auto uppercase' onClick={() => handleLevel(8)}>8 ROUNDS</button>
                        <button className='p-2 px-24 text-lg border-0 rounded-2xl text-balance bg-gradient-to-r from-red-700 from-5% via-red-400  to-red-700 to-95% mx-auto uppercase'onClick={() => handleLevel(10)}>10 ROUNDS</button>
                    </div>
                    </>
                )}
            </div>
        </div>

    );  
};

export default FindGame;
