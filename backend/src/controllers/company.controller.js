import {
  deleteCompanies,
  deleteManyCompanies,
  getAllCompanies,
  getCompanyByEmail,
  loginCompany,
  loginCompanyProfile,
  registerCompany,
  updateCompanyStatus,
} from "../services/company.service.js";
import { sendEmail } from "../services/mail.service.js";

//---------------------------------- register ---------------------------------------//
export const register = async (req, res, next) => {
  try {
    const user = await registerCompany(req.body);
    res.status(201).json({
      message: "registered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// --------------------------------- login -----------------------------------------//

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await loginCompany(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "login successfully.",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------------getProfilecontroller--------------------------------------------------//

export const getLoginProfileController = async (req, res, next) => {
  try {
    const companyProfile = await loginCompanyProfile(req.company.id);
    return res.status(200).json({
      success: true,
      message: "profile fetched successfully",
      profile: companyProfile,
    });
  } catch (error) {
    next(error);
  }
};
//----------------------------------------------getAllCompanies--------------------------------------------------//

export const getAllCompaniesController = async (req, res, next) => {
  try {
    const companies = await getAllCompanies(req.query);
    return res.status(200).json({
      message: "company fetched.",
      companies,
    });
  } catch (error) {
    next(error);
  }
};

//----------------------------------------------getCompanyByIdController--------------------------------------------------//

export const getCompanyByIdController = async (req, res, next) => {
  const { password: _, ...company } = req.targetCompany;
  return res.status(200).json({
    success: true,
    message: "company fetched successfully",
    company,
  });
};
//------------------------------------------------- updateCompanyStatusController ---------------------------------------------------//

export const updateCompanyStatusController = async (req, res, next) => {
  try {
    const company = await updateCompanyStatus(
      req.targetCompany.id,
      req.dto.status,
    );

    return res.status(200).json({
      success: true,
      message: "comapny status updated successfully.",
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------- deleteCompanyController ---------------------------------------------------//
export const deleteCompanyController = async (req, res, next) => {
  try {
    const deletedCompany = await deleteCompanies(req.targetCompany.id);
    return res.status(200).json({
      success: true,
      message: "company deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------- deleteManyCompanyController ---------------------------------------------------//

export const deleteManyCompanyController = async (req, res, next) => {
  try {
    const { count } = await deleteManyCompanies(req.body.company_ids);
    return res.status(200).json({
      success: true,
      message: `${count} companies deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

//------------------------------------------------- forgotPasswordController ---------------------------------------------------//

export const forgotPasswordController = async (req, res, next) => {
  try {
    const company = await getCompanyByEmail(req.body.email);
    if (!company) {
      const error = new Error("Invalid email");
      error.status = 404;
      return next(error);
    }
    const mail = await sendEmail(
      company?.email,
      company?.name,
      "http://localhost:5173/company/reset-password",
    );

    return res.status(200).json({
      success: true,
      message: "we have sent password-reset-link on your email.",
    });
  } catch (error) {
    next(error);
  }
};

//-------------------------------------------------  logoutCompanyController  -------------------------------------------//

export const logoutCompanyController = (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully.",
  });
};
