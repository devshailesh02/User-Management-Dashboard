import { authAxios, apiAxios } from "./axios.Instance";
import { LOGIN_PROFILE, REFRESH } from "./constant";

export const refreshToken = () => authAxios.post(REFRESH);

export const loginProfile = async () => {
  const response = await apiAxios.get(LOGIN_PROFILE);
  return response.data.profile;
};
