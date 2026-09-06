let startLoadingCallback = null;
let stopLoadingCallback = null;

let activeRequests = 0;

export const registerLoadingController = (start, stop) => {
  startLoadingCallback = start;
  stopLoadingCallback = stop;
};

export const startGlobalLoading = (message = "Please wait...") => {
  activeRequests += 1;

  if (activeRequests === 1 && startLoadingCallback) {
    startLoadingCallback(message);
  }
};

export const stopGlobalLoading = () => {
  activeRequests = Math.max(activeRequests - 1, 0);

  if (activeRequests === 0 && stopLoadingCallback) {
    stopLoadingCallback();
  }
};