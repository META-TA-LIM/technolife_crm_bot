const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1];
    const SECRET_KEY = process.env.SECRET_KEY;
    if (!token)
      res.json({
        status: "UNAUTHORIZED",
        code: 401,
        description: "The operation requires authentication.",
        error: "unauthorized. Header empty",
      });
    const verify = jwt.verify(token, SECRET_KEY);
    req.user = verify;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
