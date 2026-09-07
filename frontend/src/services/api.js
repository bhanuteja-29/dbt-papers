import axios from "axios";

import {
  startGlobalLoading,
  stopGlobalLoading,
} from "./loadingController";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  let visitorId = localStorage.getItem("visitorId");

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("visitorId", visitorId);
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["X-Visitor-Id"] = visitorId;

  config.loadingShown = false;

  config.loadingTimer = setTimeout(() => {
    config.loadingShown = true;

    startGlobalLoading(
      config.loadingMessage || "Please wait..."
    );
  }, 1500);

  return config;
});

api.interceptors.response.use(
  (response) => {
    const config = response.config;

    if (config.loadingTimer) {
      clearTimeout(config.loadingTimer);
    }

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
