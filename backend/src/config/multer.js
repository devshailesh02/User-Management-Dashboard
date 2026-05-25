import multer from "multer";
import path from "path";
import crypto from "crypto";

/**
 * Reusable multer factory
 */
const createMulter = ({
  // folder,
  allowedMimeTypes,
  allowedExtensions,
  maxFileSize,
}) => {
  /**
   * Storage configuration
   */
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, folder);
  //   },

  //   filename: (req, file, cb) => {
  //     const extension = path.extname(file.originalname).toLowerCase();

  //     const uniqueName = crypto.randomUUID() + extension;

  //     cb(null, uniqueName);
  //   },
  // });

  /**
   * Store file in memory temporarily
   */
  const storage = multer.memoryStorage();

  /**
  /**
   * 
   * File validation
   */
  const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const isValidMime = allowedMimeTypes.includes(file.mimetype);

    const isValidExtension = allowedExtensions.includes(extension);

    if (isValidMime && isValidExtension) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file"), false);
    }
  };

  /**
   * Return multer instance
   */
  return multer({
    storage,

    limits: {
      fileSize: maxFileSize,
    },

    fileFilter,
  });
};

export default createMulter;
