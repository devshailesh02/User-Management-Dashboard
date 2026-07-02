const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.company) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!roles.includes(req.company.role)) {
      return res.status(403).json({
        message: "Insufficient permissions. Access denied.",
      });
    }

    next();
  };

export default authorize;
