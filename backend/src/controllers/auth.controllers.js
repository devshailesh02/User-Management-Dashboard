import { loginUser, registerCompany } from "../services/auth.services.js";

export const register = async (req, res, next) => {
  try {
    const dto = req.dto;
    const user = await registerCompany(dto);
    res.status(201).json({
      message: "registered successfully.",
    });
  } catch (error) {
    // res.status(209).json({
    //   message: "user already registered.",
    // });
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const dto = req.dto;
    const user = await loginUser(dto);

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
