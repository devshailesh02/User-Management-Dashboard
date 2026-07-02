import {
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
    const user = await loginCompany(req.dto);

    return res.status(200).json({
      message: "login successfully.",
      data: user,
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
  } catch (error) {}
};
//------------------------------------------------- updateCompanyStatus ---------------------------------------------------//

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
