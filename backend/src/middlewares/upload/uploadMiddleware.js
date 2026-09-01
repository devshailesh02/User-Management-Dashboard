import createMulter from "../../config/multer.js";

import {
  profileConfig,
  documentConfig,
  companyLogoConfig,
} from "../../config/upload.config.js";

const uploadAvatar = createMulter(profileConfig);

const uploadDocument = createMulter(documentConfig);

const uploadCompanyLogo = createMulter(companyLogoConfig);

export { uploadAvatar, uploadDocument, uploadCompanyLogo };
