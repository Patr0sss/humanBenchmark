import React, { useEffect } from 'react';
import useMousePosition from './useMousePosition';
import "./animatedBackground.css"; 
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

const App: React.FC = () => {
    const mousePosition = useMousePosition();

    useEffect(() => {
        const mask = document.querySelector('.mask');
        if (mask instanceof HTMLElement) {
            mask.style.setProperty('--mouse-x', mousePosition.x/window.innerWidth * 100 + '%');
            mask.style.setProperty('--mouse-y', mousePosition.y/window.innerHeight * 100 + '%');
        }
    }, [mousePosition]);

  return (
    <>
        <div className='content'>
            <div className='fixed top-0 bottom-0 left-0 right-0 mask'></div>
            <div className='relative flex items-center justify-center min-h-screen'>
                <div className='bg-[#201d22] rounded-xl max-w-[1200px] w-full h-[50%] my-6 px-4 flex items-center'>
                    <div className='w-full '>
                        <div className='pt-2'>
                            <Link to="/"><TiArrowBack className='hover:scale-110' size={40} fill='#783dcb'/></Link>
                        </div>
                        <div className="py-8 text-left text-white">
                            <h1 className="py-2 text-4xl text-center md:text-5xl">Login to Your Account</h1>   
                        </div>
                        <div className="flex items-center justify-center gap-8 mx-auto my-8 text-white ">
                            <div className="outline outline-1 outline-[#383439] w-[40%] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300 transform transition my-4 md:my-0">
                                <FcGoogle className="flex" size={40}/>
                                <h1 className="text-lg font-bold xs:p-4 sm:my-0 xl:text-lg md:text-sm whitespace-nowrap">Log in with Google</h1>
                            </div>
                            <div className="outline outline-1 outline-[#383439] w-[40%] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300 transform transition my-4 md:my-0">
                                <IoLogoApple  className="flex " size={40}/>
                                <h1 className="my-4 font-bold xs:p-4 stext-lg sm:my-0 xl:text-lg md:text-sm">Log in with Apple</h1>
                            </div>
                        </div>
                        <div className="mx-8 mb-2 text-white">
                            <span className="flex py-2 text-xl tracking-wider ">Username</span>
                            <input
                                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                                placeholder="Username"
                            />
                        </div>           
                        <div className="mx-8 mb-2 text-white">
                            <span className="flex py-2 text-xl tracking-wider ">Password</span>
                            <input
                                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                                placeholder="Password"
                            />
                        </div>
                        <div className="my-6">
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                className="bg-gradient-to-br from-[#4a47d7] to-[#7632cc] p-4 font-medium text-2xl text-white rounded-xl w-[60%]">Login</motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default App;
