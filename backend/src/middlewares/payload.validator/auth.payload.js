import { registerDto } from "../../dtos/auth.dto.js";
import { hashPassword } from "../../utils/hash.js";
import { validName, validEmail, validPassword } from "../../utils/validator.js";

// *************************************** register validator ********************************************//
export const val_Register = async (req, res, next) => {
  const { name, email, password, cnf_password } = req.body;

  const nameError = validName(name);

  if (nameError.success === false) {
    const error = new Error(nameError.message);
    error.success = 400;
    return next(error);
  }

  const emailError = validEmail(email);
  if (emailError.success === false) {
    const error = new Error(emailError.message);
    error.success = 400;
    return next(error);
  }

  const passwordError = validPassword(password, cnf_password);
  if (!passwordError.success) {
    const error = new Error(passwordError.message);
    error.success = 400;
    return next(error);
  }

  const hashedPassword = await hashPassword(passwordError.message);

  const data = {
    name: nameError.message,
    email: emailError.message,
    password: hashedPassword,
  };
  req.dto = registerDto(data);

  next();
};

// ******************************* login validator *********************************************//
export const val_login = (req, res, next) => {
  const { email, password } = req.body || {};

  const emailError = validEmail(email);
  if (emailError.success === false) {
    const error = new Error(emailError.message);
    error.success = 400;
    return next(error);
  }

  const data = {
    email: emailError.message,
    password: password,
  };
  req.dto = data;

  next();
};
