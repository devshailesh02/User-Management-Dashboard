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
        avatar_url: true,
        role: true,
      },
    });
    return details;
  } catch (error) {
    throw error;
  }
};

//******************************************* fetchUsers ******************************************//
export const fetchUsers = async (page, limit) => {
  page = Math.max(Number(page) || 1, 1);
  limit = Math.min(Math.max(Number(limit) || 1, 2), 50);
  const offSet = (page - 1) * limit;

  try {
    const [userList, totalusers] = await Promise.all([
      prisma.user.findMany({
        skip: offSet,
        take: limit,
        select: {
          name: true,
          email: true,
          role: true,
          status: true,
        },

        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      }),
      prisma.user.count(),
    ]);
    // const userList = await prisma.user.findMany({
    //   skip: offSet,
    //   take: limit,
    //   select: {
    //     name: true,
    //     email: true,
    //     role: true,
    //     status: true,
    //   },

    //   orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    // });
    return {
      page: page,
      limit: limit,
      totalusers,
      totalPage: Math.ceil(totalusers / limit),
      users: userList,
    };
  } catch (error) {
    throw error;
  }
};

// ****************************************** Add Role *******************************************

export const addRole = async (role) => {
  try {
    await prisma.Role.Create({ name: role });
  } catch (error) {
    throw error;
  }
};
