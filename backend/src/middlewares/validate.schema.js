const validate = (schema, source) => async (req, res, next) => {
  try {
    req[source] = await schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      strict: true,
    });

    next();
  } catch (err) {
    const validationError = new Error("Validation failed");

    validationError.status = 400;
    validationError.type = "VALIDATION_ERROR";

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

export const validateBody = (schema) => validate(schema, "body");
export const validateParams = (schema) => validate(schema, "params");
export const validateQuery = (schema) => validate(schema, "query");
