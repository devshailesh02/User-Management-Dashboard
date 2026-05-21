import multer from "multer";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";
  /**
   * Multer Errors
   */
  if (err instanceof multer.MulterError) {
    statusCode = 400;

    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        message = "File size too large";
        break;

      case "LIMIT_FILE_COUNT":
        message = "Too many files uploaded";
        break;

      case "LIMIT_UNEXPECTED_FILE":
        message = "Unexpected file field";
        break;

      default:
        message = err.message;
    }
  }

  /**
   * Custom File Validation Error
   */
  if (err.message === "Invalid file type") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,

    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorHandler;
