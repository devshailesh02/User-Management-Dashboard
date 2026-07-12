import {
  deleteCompanies,
  deleteManyCompanies,
  getAllCompanies,
  loginCompany,
  registerCompany,
  updateCompanyStatus,
} from "../services/company.service.js";

//---------------------------------- register ---------------------------------------//
export const register = async (req, res, next) => {
  try {
    const user = await registerCompany(req.dto);
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
    const { accessToken, refreshToken } = await loginCompany(req.dto);
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
    return res.status(Number(error.status)).json({
      message: error.message,
    });
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
