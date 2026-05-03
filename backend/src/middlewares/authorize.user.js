export const authorize = (...roles) => {
  return (req, res, next) => {
    try {
      // Check if user's role is allowed
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };
};
