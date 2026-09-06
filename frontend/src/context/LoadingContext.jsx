import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  registerLoadingController,
} from "../services/loadingController";

const LoadingContext = createContext(null);

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] =
    useState(0);

  const [message, setMessage] =
    useState("Please wait...");

  const startLoading = (
    loadingMessage = "Please wait..."
  ) => {
    setLoadingCount((count) => count + 1);
    setMessage(loadingMessage);
  };

  const stopLoading = () => {
    setLoadingCount((count) =>
      Math.max(count - 1, 0)
    );
  };

  useEffect(() => {
    registerLoadingController(
      startLoading,
      stopLoading
    );

    return () => {
      registerLoadingController(null, null);
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        loading: loadingCount > 0,
        message,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error(
      "useLoading must be used inside LoadingProvider"
    );
  }

  return context;
};