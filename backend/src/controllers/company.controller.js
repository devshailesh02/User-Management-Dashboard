import { loginCompany, registerCompany } from "../services/company.service.js";

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

// --------------------------------------------------------------------------//

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
