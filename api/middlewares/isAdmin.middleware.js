const isAdmin = async (req, res, next) => {
  const data = req.user;
  if (data.role != "admin") {
    return res.status(400).json({ message: "You are not admin" });
  }
  next();
};

module.exports = isAdmin;
