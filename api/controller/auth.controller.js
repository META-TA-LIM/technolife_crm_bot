const Admins = require("../../model/admin");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const admin = await Admins.findOne({ phoneNumber });
    if (!admin)
      return res
        .status(403)
        .json({ message: "Invalid phoneNumber or password" });

    const compare = await bcrypt.compare(password, admin.password);
    if (!compare)
      return res
        .status(403)
        .json({ message: "Invalid phoneNumber or password" });

    const token = jwt.sign({ id: admin.id, role: "admin" });
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.me = async (req, res) => {
  try {
    const data = req.user;
    const admin = await Admins.findById(data.id);
    const response = {
      status: "OK",
      code: 200,
      description: "The request has succeeded",
      snapData: admin,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
