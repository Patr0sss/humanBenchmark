import { createContext, ReactNode, useContext, useState } from "react";

interface UserProps {
  email: string;
  username: string;
  password: string;
}

interface UserProvider {
  userInfo: UserProps;
  registerUser: (info: UserProps) => Promise<void>;
  //   loginUser: (info: userProps) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userInfo, setUserInfo] = useState<UserProps>({
    email: "",
    username: "",
    password: "",
  });

  const registerUser = async (info: UserProps) => {
    //   const registerUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: info.email,
          username: info.username,
          password: info.password,
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

  //   const loginUser = (info: userProps) => {
  //     setUserInfo({
  //       email: info.email,
  //       userName: info.userName,
  //       password: info.password,
  //     });
  //   };

  return (
    <UserProvider.Provider value={{ userInfo, registerUser }}>
      {children}
    </UserProvider.Provider>
  );
};
