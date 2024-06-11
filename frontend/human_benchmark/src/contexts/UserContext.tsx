import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  //   logoutUser: () => void;
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
  const [userInfo, setUserInfo] = useState<UserProps>({
    email: "",
    username: "",
    password: "",
  });

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
        }
      );

      if (res.status === 200) {
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
        }
      );
      console.log(res);
      if (res.status === 200) {
        navigate("/");
        console.log("zalogowano pomyślnie !");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UserProvider.Provider
      value={{ userInfo, registerUser, loginUser, handleUserInfoFill }}
    >
      {children}
    </UserProvider.Provider>
  );
};
