import multer from "multer";
import path from "path";

//  * Reusable multer factory *
const createMulter = ({
  allowedMimeTypes,
  allowedExtensions,
  maxFileSize,
  fileCount,
}) => {
  //  * Store file in memory temporarily *
  const storage = multer.memoryStorage();

  //  * File validation *
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

  //  * Return multer instance *
  return multer({
    storage,

    limits: {
      fileSize: maxFileSize,
      files: fileCount,
    },

    fileFilter,
  });
};

export default createMulter;
