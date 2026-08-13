// utils/handleApiError.js

import axios from "axios";

const createError = (message, options = {}) => {
  const err = new Error(message);

  err.status = options.status ?? null;
  err.code = options.code ?? null;
  err.errors = options.errors ?? null;
  err.cause = options.cause ?? null;

  return err;
};

export const handleApiError = (error) => {
  // Already a normal Error (not Axios)
  if (!axios.isAxiosError(error)) {
    throw error instanceof Error ? error : createError("Something went wrong.");
  }

  // Server responded (4xx / 5xx)
  if (error.response) {
    throw createError(error.response.data?.message ?? "Request failed.", {
      status: error.response.status,
      code: error.code,
      errors: error.response.data?.errors,
      cause: error,
    });
  }

  // Request timeout
  if (error.code === "ECONNABORTED") {
    throw createError("The request timed out. Please try again.", {
      code: error.code,
      cause: error,
    });
  }

  // Request cancelled
  if (error.code === "ERR_CANCELED") {
    throw createError("The request was cancelled.", {
      code: error.code,
      cause: error,
    });
  }

  // Network error
  if (error.code === "ERR_NETWORK") {
    throw createError(
      "Please check your network connection or try again later.",
      {
        code: error.code,
        cause: error,
      },
    );
  }

  // Request sent but no response
  if (error.request) {
    throw createError("No response received from the server.", {
      code: error.code,
      cause: error,
    });
  }

  // Invalid Axios configuration
  throw createError(error.message || "Axios request failed.", {
    code: error.code,
    cause: error,
  });
};
