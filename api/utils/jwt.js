const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "this323jasdIASF22#$qaskey";

const sign = (payload) => jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

const verify = (payload, err, data) => {
  jwt.verify(payload, SECRET_KEY, err, data);
};

module.exports = {
  sign,
  verify,
};
