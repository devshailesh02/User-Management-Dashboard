import jwt from "jsonwebtoken";

export const generateCompanyToken = (company) => {
  return jwt.sign(
    {
      id: company.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

export const generateEmployeeToken = (employee) => {
  return jwt.sign(
    {
      id: employee.id,
      company_id: employee.company_id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};
