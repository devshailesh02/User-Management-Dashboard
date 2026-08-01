import { handleApiError } from "../utils/handleApiError";
import { authAxios, apiAxios } from "./axios.Instance";
import {
  LOGIN_PROFILE,
  REFRESH,
  LOGIN_COMPANY,
  REGISTER_COMPANY,
  FORGOT_PASSWORD,
  SUPER_ADMIN_DASHBOARD,
  COMPANY_GROWTH,
} from "./constant";

// ----------------------------------- register company-----------------------------------//
export const registerCompany = async (company_details) => {
  try {
    const response = await authAxios.post(REGISTER_COMPANY, company_details);
    return response.data;
  } catch (error) {
    throw { status: error.response.status, message: error.response.data };
  }
};

// ----------------------------------- refreshToken-----------------------------------//

export const refreshToken = () => authAxios.post(REFRESH);

// -----------------------------------loginProfile-----------------------------------//

export const loginProfile = async () => {
  const response = await apiAxios.get(LOGIN_PROFILE);
  return response.data.profile;
};

// -----------------------------------loginCompany-----------------------------------//

export const loginCompany = async (loginDetais) => {
  try {
    const response = await authAxios.post(LOGIN_COMPANY, loginDetais);
    return response.data?.data;
  } catch (error) {
    handleApiError(error);
  }
};

// -----------------------------------loginCompany-----------------------------------//

export const forgotPassword = async (company_detail) => {
  try {
    const response = await authAxios.post(FORGOT_PASSWORD, company_detail);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// -----------------------------------getSuperAdmindashboard-----------------------------------//

export const getSuperAdminDashboard = async () => {
  try {
    const response = await apiAxios.get(SUPER_ADMIN_DASHBOARD);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

// -----------------------------------getSuperAdmindashboard-----------------------------------//
export const companyGrowth = async (year) => {
  try {
    const response = await apiAxios.get(`${COMPANY_GROWTH}?year=${year}`);
    return response.data?.growth;
  } catch (error) {
    handleApiError(error);
  }
};

// -----------------------------------getCompaniesList-----------------------------------//

export const getCompanyList = async (searchParams) => {
  try {
    const response = await apiAxios.get(COMPANIES_LIST, {
      params: searchParams,
    });

    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
