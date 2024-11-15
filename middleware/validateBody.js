const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const message =
        process.env.NODE_ENV === "production"
          ? "Missing required fields"
          : error.details[0].message;
      throw HttpError(400, message);
    }
    next();
  };
  return func;
};

module.exports = validateBody;