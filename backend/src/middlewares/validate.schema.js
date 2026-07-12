export const validate = (schema) => async (req, res, next) => {
  try {
    req.dto = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      strict: true,
    });

    next();
  } catch (err) {
    const validationError = new Error("Validation failed");

    validationError.status = 400;

    // Custom flag
    validationError.type = "VALIDATION_ERROR";

    // Remove duplicate errors for the same field
    const seen = new Set();

    validationError.errors = err.inner
      .filter((e) => {
        if (seen.has(e.path)) return false;
        seen.add(e.path);
        return true;
      })
      .map((e) => ({
        field: e.path,
        message: e.message,
      }));

    next(validationError);
  }
};
