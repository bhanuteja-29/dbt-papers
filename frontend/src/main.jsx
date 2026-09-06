import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingOverlay from "./components/common/LoadingOverlay";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LoadingProvider>
        <App />
        <LoadingOverlay />
      </LoadingProvider>
    </AuthProvider>
  </React.StrictMode>
);