import { fileTypeFromBuffer } from "file-type";
import validateFileSignature from "./upload/validateFileSignature";

const validateFile = ({ allowedMimeTypes, allowedExtensions }) => {
  return async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please select a file to upload.",
        });
      }

      // 2. Check the actual file signature
      const detectedType = await validateFileSignature(
        req.file.buffer,
        allowedExtensions,
        allowedMimeTypes,
      );

      // 5. Attach detected information to request
      req.detectedFileType = detectedType;

      next();
    } catch (error) {
      error.type = "VALIDATION_ERROR";
      error.errors = {
        file: "Invalid file type.",
      };
      next(error);
    }
  };
};

export default validateFile;
