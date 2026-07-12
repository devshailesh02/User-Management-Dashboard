import { generateCompanyAccessToken } from "../utils/token.js";

export const refreshAccessToken = (req, res, next) => {
  const accessToken = generateCompanyAccessToken(req.company);
  res.status(200).json({
    accessToken,
  });
};
