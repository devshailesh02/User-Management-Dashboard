import multer from "multer";
import { Prisma } from "@prisma/client";

const errorHandler = (err, req, res, next) => {
  // Log full error internally
  console.error({
    message: err.message,
    stack: err.stack,
    method: req.method,
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });

  let statusCode = err.statusCode || err.status || 500;
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
        message = "File upload failed";
    }
  } else if (err.message === "Invalid file type") {
    /**
     * Custom File Validation
     */
    statusCode = 400;
    message = "Invalid file type";
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    /**
     * Prisma Errors
     */
    switch (err.code) {
      case "P2002":
        statusCode = 409;
        message = "Resource already exists";
        break;

      case "P2003":
        statusCode = 400;
        message = "Invalid reference data";
        break;

      case "P2025":
        statusCode = 404;
        message = "Requested resource not found";
        break;

      default:
        statusCode = 500;
        message = "Database operation failed";
    }
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    /**
     * Prisma Connection Errors
     */
    statusCode = 500;
    message = "Database unavailable";
  } else if (statusCode === 500) {
    /**
     * Unknown Errors
     */
    message = "Something went wrong";
  }

  return res.status(statusCode).json({
    success: false,
    message,

    ...(process.env.NODE_ENV === "development" && {
      error: err.name,
      stack: err.stack,
    }),
  });
};

export default errorHandler;
