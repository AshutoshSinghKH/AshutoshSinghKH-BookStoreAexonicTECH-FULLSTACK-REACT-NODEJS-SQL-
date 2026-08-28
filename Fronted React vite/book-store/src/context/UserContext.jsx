import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });


  const login = (data) => {

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };


  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };


  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};