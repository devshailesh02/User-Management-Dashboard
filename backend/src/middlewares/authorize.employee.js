const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.employee.role)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions",
      });
    }

    next();
  };
