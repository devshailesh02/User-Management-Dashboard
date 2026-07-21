import prisma from "../config/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import {
  generateCompanyAccessToken,
  generateCompanyRefreshToken,
} from "../utils/token.js";

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

    const company = await prisma.company.findUnique({
      where: { email },
      include: {
        roles: true,
      },
    });

    if (!company) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }

    const isMatch = await comparePassword(password, company.password);

    if (!isMatch) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      throw error;
    }
    const accessToken = generateCompanyAccessToken(company);
    const refreshToken = generateCompanyRefreshToken(company);
    const { password: _, ...safeUser } = company;

    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
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

//--------------------------------------------- loginCompanyProgile --------------------------------------------//
export const loginCompanyProfile = (companyId) => {
  return prisma.company.findUnique({
    where: {
      id: companyId,
    },
    omit: {
      password: true,
    },
    include: {
      roles: {
        select: {
          id: true,
          name: true,
          permissions: {
            select: {
              module: true,
              action: true,
            },
          },
        },
      },
    },
  });
};
//---------------------------------------------getCompaniesService----------------------------------------------------//

export const getAllCompanies = async ({
  status,
  search,
  startDate,
  endDate,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  order = "desc",
}) => {
  const where = {};

  if (status) {
    where.status = status;
  } else {
    where.status = {
      not: "suspended",
    };
  }

  if (search) {
    where.OR = [
      {
        name: {
          contains: search,
        },
      },
      {
        email: {
          contains: search,
        },
      },
    ];
  }

  if (startDate || endDate) {
    where.createdAt = {};

    if (startDate) {
      where.createdAt.gte = new Date(startDate);
    }

    if (endDate) {
      // Optional: make endDate inclusive
      const end = new Date(endDate);
      end.setDate(end.getDate() + 1);

      where.createdAt.lt = end;
    }
  }

  return prisma.company.findMany({
    where,
    skip: (page - 1) * Number(limit),
    take: Number(limit),
    orderBy: {
      [sortBy]: order,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

//---------------------------------------------- updateCompanyService -------------------------------------------------//

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

//---------------------------------------------deleteCompaniesService----------------------------------------------------//

export const deleteCompanies = async (company_id) => {
  return prisma.company.update({
    where: {
      id: company_id,
    },
    data: {
      status: "suspended",
      deletedAt: new Date(),
    },
  });
};

//---------------------------------------------deleteManyCompanies----------------------------------------------------//

export const deleteManyCompanies = async (companyIds) => {
  return prisma.company.updateMany({
    where: {
      id: {
        in: companyIds,
      },
      deletedAt: null, // Don't update already deleted companies
    },
    data: {
      status: "suspended",
      deletedAt: new Date(),
    },
  });
};

//------------------------------------------------- get company by email ---------------------------------------------------//

export const getCompanyByEmail = (email) =>
  prisma.company.findUnique({
    where: {
      email,
    },
    omit: {
      password: true,
    },
  });

//------------------------------------------------- companyStatics ---------------------------------------------------//

export const companyStatics = () =>
  prisma.company.groupBy({
    by: ["status"],
    _count: true,
  });

//------------------------------------------------- employee count---------------------------------------------------//

export const employeesCount = () => prisma.employee.count();

//------------------------------------------------- employee count---------------------------------------------------//

export const companyGrowth = () => prisma.$queryRaw`
SELECT
    YEAR(createdAt) AS year,
    MONTH(createdAt) AS month,
    CAST(COUNT(*) AS SIGNED) AS total
FROM Company
GROUP BY YEAR(createdAt), MONTH(createdAt)
ORDER BY YEAR(createdAt), MONTH(createdAt)
`;
