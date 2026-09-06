import axios from "axios";
import {
  startGlobalLoading,
  stopGlobalLoading,
} from "./loadingController";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.loadingShown = false;

  config.loadingTimer = setTimeout(() => {
    config.loadingShown = true;

    startGlobalLoading(
      config.loadingMessage || "Please wait..."
    );
  }, 600);

  return config;
});

api.interceptors.response.use(
  (response) => {
    const config = response.config;

    clearTimeout(config.loadingTimer);

    if (config.loadingShown) {
      stopGlobalLoading();
    }

    return response;
  },

  (error) => {
    const config = error.config;

    if (config?.loadingTimer) {
      clearTimeout(config.loadingTimer);
    }

    if (config?.loadingShown) {
      stopGlobalLoading();
    }

    return Promise.reject(error);
  }
);

export default api;