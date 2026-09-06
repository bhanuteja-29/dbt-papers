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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Please wait...");

  const startLoading = (loadingMessage = "Please wait...") => {
    setLoading(true);
    setMessage(loadingMessage);
  };

  const stopLoading = () => {
    setLoading(false);
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
        loading,
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