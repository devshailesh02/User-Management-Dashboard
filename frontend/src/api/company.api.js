import axiosInstance from "./axios.Instance";
import { REFRESH } from "./constant";

export const refreshToken = () => axiosInstance.post(REFRESH);
