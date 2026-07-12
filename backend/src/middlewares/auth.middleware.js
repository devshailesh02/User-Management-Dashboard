import jwt from "jsonwebtoken";
import { getCompanyProfile } from "../services/company.service.js";

export const verifyRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "login required" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_JWT_SECRET);
    const company = await getCompanyProfile(decoded.id);

    if (!company) {
      return res.status(401).json({
        message: "Company account not found.",
      });
    }

    if (company.status !== "active") {
      return res.status(403).json({
        message: "Company account is inactive.",
      });
    }

    req.company = company;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};
