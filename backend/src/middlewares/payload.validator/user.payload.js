export const validateStatusUpdate = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "Status is required",
    });
  }

  // optional: strict validation
  const allowed = ["active", "inactive", "deleted"];
  if (!allowed.includes(status)) {
    return res.status(400).json({
      message: "Invalid status value",
    });
  }

  next();
};
