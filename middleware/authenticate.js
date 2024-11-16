const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");
const { HttpError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  console.log("Authorization header:", authorization); // Логирование заголовка

  if (bearer !== "Bearer") {
    console.log("Error Bearer:", bearer)
    return next(HttpError(401, "Not authorized"));
  }

  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(userId);

    if (!user || !user.token || user.token !== token) {
      console.log("Error token:", user.token);
      return next(HttpError(401, "Not authorized"));
    }
    req.user = user;  
    next();
  } catch (error) {
    return next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
