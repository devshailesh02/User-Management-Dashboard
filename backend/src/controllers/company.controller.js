import { CompanyStatus } from "@prisma/client";
import {
  companyGrowth,
  companyStatics,
  deleteCompanies,
  deleteManyCompanies,
  employeesCount,
  getAllCompanies,
  getCompanyByEmail,
  getSuperAdmindashboard,
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
    console.log("user_______________", user);
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
    const { accessToken, refreshToken, role } = await loginCompany(req.body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "login successfully.",
      data: { accessToken, role },
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
      req.body.status,
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

//-------------------------------------------------  companyStaticsController  -------------------------------------------//

export const companyStaticsController = async (req, res, next) => {
  try {
    // const statics = await companyStatics();
    // const employees = await employeesCount();
    const [statics, employees] = await Promise.all([
      companyStatics(),
      employeesCount(),
    ]);
    const stats = { total: 0 };
    statics.forEach(({ status, _count }) => {
      stats.total += _count;
      stats[status] = _count;
    });
    Object.values(CompanyStatus).forEach((elm) => {
      if (!stats[elm]) {
        stats[elm] = 0;
        return;
      }
    });
    return res.status(200).json({
      success: true,
      message: "company statics get successfully",
      data: { stats, employees },
    });
  } catch (error) {
    next(error);
  }
};

//-------------------------------------------------  companyStaticsController  -------------------------------------------//

export const companyGrowthController = async (req, res, next) => {
  try {
    let { year } = req.query;

    // Convert query string to number
    year = year ? Number(year) : new Date().getFullYear();

    // Validation
    if (!Number.isInteger(year)) {
      return res.status(400).json({
        success: false,
        message: "Year must be an integer",
      });
    }

    const currentYear = new Date().getFullYear();

    if (year < 2025 || year > currentYear) {
      return res.status(400).json({
        success: false,
        message: `Year must be between 2025 and ${currentYear}`,
      });
    }
    const months = [
      "",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthvalue = {};
    const growth = await companyGrowth(year);
    const formattedGrowth = growth.map((item) => {
      monthvalue[months[item.month]] = {
        label: months[item.month],
        total: Number(item.total),
      };
      return {
        label: months[item.month],
        total: Number(item.total),
      };
    });
    const returngrowth = [];
    const date = new Date().getMonth() + 1;
    for (let i = 1; i < date; i++) {
      if (!monthvalue[months[i]]) {
        returngrowth.push({ label: months[i], total: 0 });
      } else {
        returngrowth.push(monthvalue[months[i]]);
      }
    }
    return res.status(200).json({
      success: true,
      message: "growth record fetched successfully",
      growth: returngrowth,
    });
  } catch (error) {
    next(error);
  }
};

//-------------------------------------------------  superAdminDashboardController  -------------------------------------------//

export const superAdminDashboardController = async (req, res, next) => {
  try {
    const dashboard = await getSuperAdmindashboard();
    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};
