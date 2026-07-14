import { authAxios, apiAxios } from "./axios.Instance";
import {
  LOGIN_PROFILE,
  REFRESH,
  LOGIN_COMPANY,
  REGISTER_COMPANY,
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
    const response = authAxios.post(LOGIN_COMPANY, loginDetais);
    return response.data;
  } catch (error) {
    throw error;
  }
};
