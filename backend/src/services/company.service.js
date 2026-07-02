import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateCompanyToken } from "../utils/token.js";

//--------------------------------------------- registerCompany --------------------------------------------//
export const registerCompany = async (dto) => {
  try {
    const { name, email, password } = dto;
    const hashed = await hashPassword(password);
    const user = await prisma.company.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

//--------------------------------------------- loginCompany --------------------------------------------//

export const loginCompany = async (dto) => {
  try {
    const { email, password } = dto;
    const user = await prisma.company.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });

    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }
    const token = generateCompanyToken(user);
    const { password: _, ...safeUser } = user;

    return { token, user: safeUser };
  } catch (error) {
    // ✅ Known error (already has status)
    if (error.status) {
      throw error;
    }
    // ❌ Unknown error → convert to 500
    const err = new Error("Internal Server Error");
    err.status = 500;
    throw err;
  }
};

//--------------------------------------------- getCompanyProfile --------------------------------------------//

export const getCompanyProfile = async (companyId) => {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return company;
};
//---------------------------------------------getCompanies----------------------------------------------------//

export const getAllCompanies = ({
  status,
  search,
  page,
  limit,
  sortBy,
  order,
}) => {
  return prisma.company.findMany();
};

//---------------------------------------------- updateCompany -------------------------------------------------//

export const updateCompanyStatus = async (company_id, status) => {
  return prisma.company.update({
    where: {
      id: company_id,
    },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
