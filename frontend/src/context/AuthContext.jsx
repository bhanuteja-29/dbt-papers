import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;
  });

  const login = (token, user = null) => {
    localStorage.setItem("token", token);

    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );
    }

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));

      const storedUser =
        localStorage.getItem("user");

      setUser(
        storedUser
          ? JSON.parse(storedUser)
          : null
      );
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () =>
      window.removeEventListener(
        "storage",
        handleStorage
      );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};