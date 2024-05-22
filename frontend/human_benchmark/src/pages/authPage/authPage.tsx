import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";

export default function AuthPage() {
  // <div>AuthPage</div>
  // <Link to="/">Link to Landing Page</Link>
  return (
    <div className="w-screen h-screen bg-[#201d22] py-8">
      <div className="2xl:max-w-[1500px] bg-[#2c282e] mx-auto h-full rounded-lg grid-cols-2 grid">
        <div className=" relative bg-[#783dcb] rounded-lg m-4 p-4 flex items-end">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center brightness-125 opacity-15 rounded-lg" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573511860302-28c524319d2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          ></div>
          <div className=" w-full z-10">
            <ul className=" py-2">
              <li>
                <Link className=" text-white cursor-pointer hover:text-black "  to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>


        <div className="relative rounded-lg m-4 p-4  grid grid-rows-5">
          {/* Nagłówek wraz z logowaniem google */}
          <div className=" w-full grid row-span-2  border-b-[1px]  border-[#383439] mb-8">
            {/* wstepne napisy */}
            <div className=" text-left text-white row-span-1">
              <h1 className="py-2">Get Started Now</h1>
              <h1 className="text-xl ">Enter your credentials to access your account</h1>
            </div>
            <div className=" text-left text-white row-span-1 grid grid-cols-2 gap-8 my-12">
              <div className="outline outline-1 outline-[#383439] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300">
                <FcGoogle className="flex" size={40}/>
                <h1 className="text-lg font-bold">Log in with Google</h1>
              </div>
              <div className="outline outline-1 outline-[#383439] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300">
                <IoLogoApple  className=" flex" size={40}/>
                <h1 className="text-lg font-bold">Log in with Apple</h1>
              </div>
            </div>
          </div>
          <div className=" row-span-3">
            {/* email */}
            <div className="w-full mb-4">
              <span className=" flex text-xl tracking-wider py-2">Email address</span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white"
                placeholder="Email"
              />
            </div>
            {/* username */}
            <div className="w-full mb-4">
              <span className=" flex text-xl tracking-wider py-2">Username</span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white"
                placeholder="Username"
              />
            </div>
            {/* Password */}            
            <div className="w-full mb-4">
              <span className=" flex text-xl tracking-wider py-2">Password</span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white"
                placeholder="Password"
              />
            </div>
            <div className="my-8">
              <button className=" w-full bg-gradient-to-br from-[#4a47d7] to-[#7632cc] p-4 font-medium text-2xl">Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
