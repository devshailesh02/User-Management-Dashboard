import jwt from "jsonwebtoken";

export const generateCompanyAccessToken = (company) => {
  return jwt.sign(
    {
      id: company.id,
    },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    },
  );
};

export const generateCompanyRefreshToken = (company) => {
  return jwt.sign(
    {
      id: company.id,
    },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    },
  );
};
export const generateEmployeeAccessToken = (employee) => {
  return jwt.sign(
    {
      id: employee.id,
      company_id: employee.company_id,
    },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    },
  );
};
