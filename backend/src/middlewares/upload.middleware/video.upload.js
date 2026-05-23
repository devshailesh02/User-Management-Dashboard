import createMulter from "../../config/multer";

const uploadVideo = createMulter({
  folder: "uploads/videos/",

  allowedMimeTypes: ["video/mp4", "video/webm"],

  allowedExtensions: [".mp4", ".webm"],

  maxFileSize: 100 * 1024 * 1024,
});

export default uploadVideo;
