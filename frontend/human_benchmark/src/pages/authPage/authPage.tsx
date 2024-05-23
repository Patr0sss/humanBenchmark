import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";
import { motion } from "framer-motion";

export default function AuthPage() {
  // <div>AuthPage</div>
  // <Link to="/">Link to Landing Page</Link>
  return (
    <div className="w-screen h-screen bg-[#201d22] py-8">
      <div className="2xl:max-w-[1500px] bg-[#2c282e] mx-auto h-full rounded-lg grid-cols-2 grid">
        <div className=" relative bg-[#783dcb] rounded-lg m-4 p-4 flex items-end">
          <div 
            className="absolute inset-0 w-full h-full bg-center bg-cover rounded-lg brightness-125 opacity-15" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573511860302-28c524319d2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          ></div>
          <div className="z-10 w-full ">
            <ul className="py-2 ">
              <li>
                <Link className="text-white cursor-pointer hover:text-black"  to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="relative grid grid-rows-5 p-4 m-4 rounded-lg">
          {/* Nagłówek wraz z logowaniem google */}
          <div className=" w-full grid row-span-2  border-b-[1px]  border-[#383439] mb-8">
            {/* wstepne napisy */}
            <div className="row-span-1 text-left text-white ">
              <h1 className="py-2 text-5xl">Get Started Now</h1>
              <h1 className="text-2xl ">Enter your credentials to access your account</h1>
            </div>
            <div className="grid grid-cols-2 row-span-1 gap-8 my-12 text-left text-white ">
              <div className="outline outline-1 outline-[#383439] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300 transform transition">
                <FcGoogle className="flex" size={40}/>
                <h1 className="text-lg font-bold">Log in with Google</h1>
              </div>
              <div className="outline outline-1 outline-[#383439] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300 transform transition">
                <IoLogoApple  className="flex " size={40}/>
                <h1 className="text-lg font-bold">Log in with Apple</h1>
              </div>
            </div>
          </div>
          <div className="row-span-3 ">
            {/* email */}
            <div className="w-full mb-4 text-white">
              <span className="flex py-2 text-xl tracking-wider ">Email address</span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                placeholder="Email"
              />
            </div>
            {/* username */}
            <div className="w-full mb-4 text-white">
              <span className="flex py-2 text-xl tracking-wider ">Username</span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                placeholder="Username"
              />
            </div>
            {/* Password */}            
            <div className="w-full mb-4 text-white">
              <span className="flex py-2 text-xl tracking-wider ">Password</span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                placeholder="Password"
              />
            </div>
            <div className="my-8">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full bg-gradient-to-br from-[#4a47d7] to-[#7632cc] p-4 font-medium text-2xl text-white rounded-xl">Register</motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
