import prisma from "../config/prisma.js";

//******************************************* updateStatus ******************************************//
export const userStatus = async (userId, status) => {
  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { status: status },
    });
    return updated;
  } catch (error) {
    throw error;
  }
};

//******************************************* getMyProfile ******************************************//
export const getMyProfile = async (userId) => {
  try {
    const details = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
        name: true,
        status: true,
        role: true,
      },
    });
    return details;
  } catch (error) {
    throw error;
  }
};

//******************************************* fetchUsers ******************************************//
export const fetchUsers = async () => {
  try {
    const userList = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        role: true,
        status: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return userList;
  } catch (error) {
    throw error;
  }
};
