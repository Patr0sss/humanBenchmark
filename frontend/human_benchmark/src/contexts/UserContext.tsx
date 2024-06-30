import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

interface UserProps {
  email: string;
  username: string;
  password: string;
}

interface UserProvider {
  userInfo: UserProps;
  registerUser: (info: UserProps) => Promise<void>;
  handleUserInfoFill: (e: { target: { name: string; value: string } }) => void;
  loginUser: (info: UserProps) => void;
  isUserAuthenticated: boolean;
  checkUserStatus: () => void;
  logoutUser: () => void;
  //   isLoggedIn: () => boolean;
}

interface userProviderProps {
  children: ReactNode;
}

const UserProvider = createContext({} as UserProvider);

export const useUserInfo = () => {
  return useContext(UserProvider);
};

export const UserContext = ({ children }: userProviderProps) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["csrftoken"]);
  const [userInfo, setUserInfo] = useState<UserProps>({
    email: "",
    username: "",
    password: "",
  });
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  const registerUser = async (info: UserProps) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/auth",
        {
          email: info.email,
          username: info.username,
          password: info.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(res.status);
      if (res.status === 200) {
        // setIsUserAuthenticated(true);
        console.log(cookies);
        navigate("/");
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserInfoFill = (e: {
    target: { name: string; value: string };
  }) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });

    console.log(userInfo);
  };

  const loginUser = async (info: UserProps) => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/login",
        {
          username: info.username,
          password: info.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        // sessionStorage.setItem("user", res.data.user.id);
        // sessionStorage.setItem("user", {id: res.data.user.id, username : res.data.user.username});
        const userObject = {
          id: res.data.user._id,
          username: res.data.user.username,
          email: res.data.user.email,
        };
        sessionStorage.setItem("user", JSON.stringify(userObject));
        // console.log(res.data.user);
        document.cookie = `csrftoken=${res.data.user.token}`;
        // setUserInfo({
        //   email: res.data.user.email,
        //   username: res.data.user.username,
        //   password: "",
        // });
        navigate("/");
        console.log(res);
        console.log("zalogowano pomyślnie !");
        console.log("ciastko : ", cookies.csrftoken);
        console.log("ciastkaaaa : ", document.cookie);
      }
    } catch (err) {
      console.log(err);
      console.log(cookies);
    }
  };

  const checkUserStatus = () => {
    const userStringified = sessionStorage.getItem("user");

    if (cookies.csrftoken && userStringified) {
      setIsUserAuthenticated(true);
      const user = JSON.parse(userStringified);
      setUserInfo({
        email: user.email,
        username: user.username,
        password: "",
      });
    } else {
      setIsUserAuthenticated(false);
      sessionStorage.removeItem("user");
    }
    // console.log(cookies.csrftoken);
  };

  const logoutUser = () => {};

  return (
    <UserProvider.Provider
      value={{
        userInfo,
        registerUser,
        loginUser,
        handleUserInfoFill,
        isUserAuthenticated,
        checkUserStatus,
        logoutUser,
      }}
    >
      {children}
    </UserProvider.Provider>
  );
};
