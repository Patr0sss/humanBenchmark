import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io";
import { motion } from "framer-motion";
// import { useUserInfo } from "../../contexts/UserContext";
// import { useState } from "react";

// interface UserProps {
//   email: string;
//   username: string;
//   password: string;
// }

export default function AuthPage() {
  // const { registerUser } = useUserInfo();
  // const [userInfo, setUserInfo] = useState<UserProps>({
  //   email: "MIYAGIAAAAAAAAAA3",
  //   username: "AAAAAAAAAAAAA",
  //   password: "AAAAAAAAAA",
  // });

  // const handleUserCreate = async () => {
  //   try {
  //     await registerUser({
  //       // email: "miyagiTest3",
  //       // username: "MIYAGI3",
  //       // password: "123",
  //       email: userInfo.email,
  //       username: userInfo.username,
  //       password: userInfo.password,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }

  //   console.log("KURWA");
  // };

  // const handleUserCreate = () => {
  //   console.log("KURWA");
  // };

  const registerUser = async () => {
    //   const registerUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "xD@gmail.com",
          username: "Xdd",
          password: "spasasdasd",
          // email,
          // username,
          // password,
        }),
      });
      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.log("BŁĘDY KURWA");
    }
  };
  return (
    <div className="w-screen h-fit sm:h-screen bg-[#201d22] py-8">
      <div className="3xl:max-w-[1700px] 2xl:max-w-[1500px] xl:max-w-[1200px] lg:max-w-[960px] md:max-w-[700px] sm:max-w-[600px] xsm:max-w-[500px] max-w-[350px] bg-[#2c282e] mx-auto md:h-full h-fit rounded-lg lg:grid-cols-2 lg:grid py-2 lg:py-0">
        <div className="relative bg-[#783dcb] rounded-lg m-4 p-4 hidden items-end lg:flex">
          <div
            className="absolute inset-0 w-full h-full bg-center bg-cover rounded-lg brightness-125 opacity-15"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1573511860302-28c524319d2a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            }}
          ></div>
          <div className="z-10 w-full ">
            <ul className="py-2 ">
              <li>
                <Link
                  className="text-white cursor-pointer hover:text-black"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative p-4 m-4 rounded-lg md:grid-rows-5 md:grid">
          {/* Nagłówek wraz z logowaniem google */}
          <div className=" w-full grid row-span-2  border-b-[1px]  border-[#383439] mb-12">
            {/* wstepne napisy */}
            <div className="row-span-1 text-left text-white ">
              <h1 className="py-2 text-4xl md:text-5xl">Get Started Now</h1>
              <h1 className="text-2xl xl:text-2xl md:text-xl">
                Enter your credentials to access your account
              </h1>
            </div>
            <div className="row-span-1 gap-8 my-8 text-left text-white md:grid-cols-2 md:grid">
              <div className="outline outline-1 outline-[#383439] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300 transform transition my-4 md:my-0">
                <FcGoogle className="flex" size={40} />
                <h1 className="my-4 text-lg font-bold xs:p-4 sm:my-0 xl:text-lg md:text-sm whitespace-nowrap">
                  Log in with Google
                </h1>
              </div>
              <div className="outline outline-1 outline-[#383439] flex rounded-2xl items-center justify-center cursor-pointer hover:scale-110 hover:ease-in-out hover:duration-300 transform transition my-4 md:my-0">
                <IoLogoApple className="flex " size={40} />
                <h1 className="my-4 font-bold xs:p-4 stext-lg sm:my-0 xl:text-lg md:text-sm">
                  Log in with Apple
                </h1>
              </div>
            </div>
          </div>
          <div className="row-span-3 -mt-8">
            {/* email */}
            <div className="w-full mb-2 text-white">
              <span className="flex py-2 text-xl tracking-wider ">
                Email address
              </span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                placeholder="Email"
              />
            </div>
            {/* username */}
            <div className="w-full mb-2 text-white">
              <span className="flex py-2 text-xl tracking-wider ">
                Username
              </span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                placeholder="Username"
              />
            </div>
            {/* Password */}
            <div className="w-full mb-2 text-white">
              <span className="flex py-2 text-xl tracking-wider ">
                Password
              </span>
              <input
                className="outline outline-1 outline-[#383439] rounded-xl w-full py-4 px-2 bg-[#2c282e] text-white focus:outline-[#783dcb] focus:outline-2"
                placeholder="Password"
              />
            </div>
            <div className="my-6">
              <motion.button
                onClick={() => registerUser}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="w-full bg-gradient-to-br from-[#4a47d7] to-[#7632cc] p-4 font-medium text-2xl text-white rounded-xl"
              >
                Register
              </motion.button>
            </div>
            <div className="flex justify-center">
              <span className="flex text-xl text-white">
                Already a member? &#8203;
                <Link to="/login">
                  <h1 className=" text-[#7632cc] text-xl cursor-pointer hover:border-b-2 hover:border-[#7632cc] hover:font-bold">
                    Login
                  </h1>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
