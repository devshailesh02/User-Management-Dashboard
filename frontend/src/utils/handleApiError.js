// utils/handleApiError.js
import axios from "axios";

export const handleApiError = (error) => {
  // Axios errors
  if (axios.isAxiosError(error)) {
    // Server responded with an error
    if (error.response) {
      const message =
        error.response.data?.message || "Something went wrong on the server.";

      const err = new Error(message);
      err.status = error.response.status;
      err.errors = error.response.data?.errors;
      throw err;
    }

    // Request timed out
    if (error.code === "ECONNABORTED") {
      const err = new Error(
        "The server took too long to respond. Please try again.",
      );
      err.status = 408;
      throw err;
    }

    // No response received
    if (error.request) {
      const err = new Error(
        "Unable to connect to the server. Please check your internet connection.",
      );
      err.status = 503;
      throw err;
    }

    // Axios configuration error
    const err = new Error(error.message || "Request failed.");
    err.status = 500;
    throw err;
  }

  // Normal JavaScript errors
  if (error instanceof Error) {
    throw error;
  }

  // Unknown errors
  throw new Error("Something went wrong.");
};
