import { fileTypeFromBuffer } from "file-type";

const validateFileSignature = async (
  buffer,
  allowedMimeTypes,
  allowedExtensions,
) => {
  const detectedType = await fileTypeFromBuffer(buffer);

  if (!detectedType) {
    throw new Error("Unable to determine actual file type");
  }

  const isValidMime = allowedMimeTypes.includes(detectedType.mime);

  const isValidExtension = allowedExtensions.includes(`.${detectedType.ext}`);

  if (!isValidMime || !isValidExtension) {
    throw new Error("File content does not match allowed file type");
  }

  return detectedType;
};

export default validateFileSignature;
