import jwt from "jsonwebtoken";
import { getCompanyProfile } from "../services/company.service.js";

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

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
      message: "Invalid or expired token",
    });
  }
};

export default authenticate;
