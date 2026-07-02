export const validate = (schema) => async (req, res, next) => {
  try {
    req.dto = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      strict: true,
    });

    next();
  } catch (err) {
    const error = new Error(err.errors.join(", "));
    error.status = 400;
    next(error);
  }
};
