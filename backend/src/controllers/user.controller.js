import {
  fetchUsers,
  getMyProfile,
  userStatus,
} from "../services/user.services.js";

//******************************************* updateStatus ******************************************//
export const updateStatus = async (req, res, next) => {
  try {
    const { userId, status } = req.body;
    const updated = await userStatus(userId, status);

    return res.status(200).json({
      message: "status updated successfully.",
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

//******************************************* myProfile ******************************************//
export const myProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const profile = await getMyProfile(id);
    return res.status(200).json({
      me: profile,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "enternal server error",
    });
  }
};

//******************************************* getUserList ******************************************//
export const getUserList = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page, limit } = req.query;
    const data = await fetchUsers(page, limit);
    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message || "internal server error",
    });
  }
};
