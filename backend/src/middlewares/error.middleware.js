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

  /**
   * Validation Errors (Yup)
   */
  if (err.type === "VALIDATION_ERROR") {
    return res.status(400).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  /**
   * Multer Errors
   */
  if (err instanceof multer.MulterError) {
    let message = "File upload failed";

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
    }

    return res.status(400).json({
      success: false,
      message,
    });
  }

  /**
   * Custom File Validation
   */
  if (err.message === "Invalid file type") {
    return res.status(400).json({
      success: false,
      message: "Invalid file type",
    });
  }

  /**
   * Prisma Known Errors
   */
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return res.status(409).json({
          success: false,
          message: "Resource already exists",
        });

      case "P2003":
        return res.status(400).json({
          success: false,
          message: "Invalid reference data",
        });

      case "P2025":
        return res.status(404).json({
          success: false,
          message: "Requested resource not found",
        });

      default:
        return res.status(500).json({
          success: false,
          message: "Database operation failed",
        });
    }
  }

  /**
   * Prisma Connection Errors
   */
  if (err instanceof Prisma.PrismaClientInitializationError) {
    return res.status(500).json({
      success: false,
      message: "Database unavailable",
    });
  }

  /**
   * Custom App Errors
   */
  if (err.status || err.statusCode) {
    return res.status(err.status || err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
  }

  /**
   * Unknown Errors
   */
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
    ...(process.env.NODE_ENV === "development" && {
      error: err.name,
      stack: err.stack,
    }),
  });
};

export default errorHandler;
