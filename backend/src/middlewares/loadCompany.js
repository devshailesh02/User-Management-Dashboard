import prisma from "../config/prisma.js";

export const loadCompany = async (req, res, next) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        id: req.params.company_id,
      },
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    req.targetCompany = company;

    next();
  } catch (error) {
    next(error);
  }
};
