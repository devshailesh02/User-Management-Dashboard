import { setAccessToken } from "../utils/token.js";
import { authAxios } from "./axios.Instance.js";
import { LOGOUT, REFRESH } from "./constant.js";

export const refresh = async () => {
  try {
    const response = await authAxios.post(REFRESH);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await authAxios.post(LOGOUT);
    setAccessToken(null);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
