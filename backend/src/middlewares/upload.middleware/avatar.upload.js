import createMulter from "../../config/multer.js";

const uploadAvatar = createMulter({
  folder: "upload/avatar/",

  allowedMimeTypes: ["image/png", "image/jpeg", "image/webp"],

  allowedExtensions: [".png", ".jpg", ".jpeg", ".webp"],

  maxFileSize: 2 * 1024 * 1024,
});

export default uploadAvatar;
