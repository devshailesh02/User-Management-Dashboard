import { setAccessToken } from "../utils/token.js";
import { authAxios } from "./axios.Instance.js";
import { LOGOUT, REFRESH } from "./constant.js";

export const refresh = async () => {
  try {
    const response = await authAxios.post(REFRESH);
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  } catch (error) {
    console.log("error_____________________________", error);
    return;
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
