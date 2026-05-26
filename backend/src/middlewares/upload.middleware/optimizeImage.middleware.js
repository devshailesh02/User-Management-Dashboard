import sharp from "sharp";
import crypto from "crypto";
import path from "path";

import avatarVariants from "../../config/imageVariant.config.js";

const optimizeImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    const imageId = crypto.randomUUID();

    const generatedImages = {};

    await Promise.all(
      avatarVariants.map(async (variant) => {
        const fileName = `${imageId}-${variant.suffix}.webp`;

        const outputPath = path.join("upload/avatar", fileName);

        await sharp(req.file.buffer)
          .resize(variant.width, variant.height, {
            fit: "cover",
            position: sharp.strategy.attention,
          })
          .webp({
            quality: variant.quality,
          })
          .toFile(outputPath);

        generatedImages[variant.name] = `/upload/avatar/${fileName}`;
      }),
    );

    req.images = generatedImages;

    next();
  } catch (error) {
    next(error);
  }
};

export default optimizeImage;
