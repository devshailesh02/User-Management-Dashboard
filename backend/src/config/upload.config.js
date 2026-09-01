export const profileConfig = {
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],

  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],

  maxFileSize: 2 * 1024 * 1024, // 2 MB,
};

export const documentConfig = {
  allowedMimeTypes: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],

  allowedExtensions: [".pdf", ".doc", ".docx"],

  maxFileSize: 5 * 1024 * 1024, // 5 MB
};

export const companyLogoConfig = {
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],

  allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],

  maxFileSize: 2 * 1024 * 1024, // 2 MB
};
